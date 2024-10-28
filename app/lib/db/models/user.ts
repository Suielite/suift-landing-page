
import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import validator from "validator";

export interface Users extends Document {
  _id: string;
  walletAddress?: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen: Date;
  email: string;
  username: string;
  password?: string;
  authType: "local" | "google";
  googleId?: string;
  credentials: boolean;
  sentMessages: Array<mongoose.Types.ObjectId>;  // Messages sent by user
  receivedMessages: Array<mongoose.Types.ObjectId>;  // Messages received by user
  chats: Array<mongoose.Types.ObjectId>;
  created_at: Date;
  updated_at: Date;
}


export type ModelId = mongoose.Types.ObjectId | string;
// Define shared interfaces for both models
export interface UserReference {
  _id: ModelId;
  username: string;
  walletAddress?: string;
  avatar?: string;
}
// Create base model check helper
export const checkModel = <T>(modelName: string, schema: mongoose.Schema<T>): mongoose.Model<T> => {
  return mongoose.models[modelName] || mongoose.model<T>(modelName, schema);
};

export interface UserModel extends Model<Users> {
  createUser(data: Partial<Users>): Promise<Users>;
  usernameContains(data:{regex: string}): Promise<Users[] | Error>;
  validateLogin(data: {
    email: string;
    password: string;
  }): Promise<Users>;
  findByEmailAndUsername(data: {
    email: string;
    username: string;
  }): Promise<{ success: boolean }>;
  getUsersFromRegex(data: {
    regex: string;
  }): Promise<Users[]>;
}

// User Schema
const UserSchema = new mongoose.Schema<Users, UserModel>(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      maxlength: [60, "Email cannot be more than 60 characters"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      maxlength: [20, "Username cannot be more than 20 characters"],
    },
    password: {
      type: String,
      required: [
        function (this: Users) {
          return this.authType === "local";
        },
        "Password is required for local authentication",
      ],
      validate: {
        validator: function (this: Users, value: string) {
          return (
            this.authType === "google" || true
            // uncomment for production
            // validator.isStrongPassword(value, { minSymbols: 0,minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })
          );
        },
        message: "Please provide a strong password",
      },
    },
    walletAddress: { 
      type: String, 
      required: false, 
      unique: true 
    },
    avatar: String,
    status: { 
      type: String, 
      enum: ['online', 'offline'], 
      default: 'offline' 
    },
    lastSeen: { 
      type: Date, 
      default: Date.now 
    },
    authType: {
      type: String,
      required: true,
      enum: ["local", "google"],
    },
    googleId: {
      type: String,
      required: [
        function (this: Users) {
          return this.authType === "google";
        },
        "Google ID is required for Google authentication",
      ],
    },
    credentials: {
      type: Boolean,
      default: false,
    },
    sentMessages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    receivedMessages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// UserSchema.statics.getUsersFromRegex = async function ({ regex }) {
//   //return name ,lastmessage,
//   console.log({ regex },"regex");
//   return this.find({ username: { $regex: regex } });
// }

// Add the static method properly
UserSchema.static('getUsersFromRegex', async function(data: { regex: string }): Promise<Users[]> {
  const { regex } = data;
  try {
    const users = await this.find({
      username: { $regex: regex, $options: 'i' }  // Added case-insensitive option
    }).exec();
    return users;
  } catch (error) {
    console.error("Error in getUsersFromRegex:", error);
    throw error;
  }
});
// Static methods
UserSchema.statics.createUser = async function (data: Partial<Users>) {
  const { email, username, password, authType, googleId } = data;

  // Validate required fields
  if (!email || !username || (!password && authType === "local")) {
    throw new Error("Please provide all required fields");
  }
console.log("checking if email or username already exists")
  // Check if email or username already exists
  const existingUser = await this.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "Email already exists"
        : "Username already exists"
    );
  }

  console.log("creating user")
  return this.create({
    ...data,
    credentials: true,
  });
};

UserSchema.statics.validateLogin = async function (data: {
  email: string;
  password: string;
}):Promise<Users> {
  
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Please provide all required fields");
  }
  

  const user = await this.findOne({
    email,
    // auth type = local or both
    authType: { $in: ["local", "both"] },
  });
  

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Email and password do not match");
  }

  return user;
};

UserSchema.statics.findByEmailAndUsername = async function ({
  email,
  username,
}: {
  email: string;
  username: string;
}):Promise<Users> {
  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    throw new Error("Email does not exist");
  }

  if (username !== emailExist.username) {
    throw new Error("Username does not match");
  }

  return emailExist;
};


// Export the model
export const User = checkModel<Users>('User', UserSchema);



const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;

    throw e;
  }

  return cached.conn;
}

export default dbConnect;
