"use server"

import mongoose, { Model } from "mongoose";




import bcrypt from "bcrypt";
import validator from "validator";
import { writeFileSync } from "fs";
import { createChat } from "@/actions/dbFunctions";
import { ObjectId } from "mongoose";

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
  }): Promise<Users | Error>;
  findByEmailAndUsername(data: {
    email: string;
    username: string;
  }): Promise<{ success: boolean } | Error>;
  getUsersFromRegex(data: {
    regex: string;
  }): Promise<Users[] | Error>;
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
}) {
  
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
}) {
  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    return new Error("Email does not exist");
  }

  if (username !== emailExist.username) {
    throw new Error("Username does not match");
  }

  return { success: true };
};


export interface IChat {
  _id: string;
  type: "private" | "group";
  participants: Array<{
    userId: mongoose.Types.ObjectId;
  }>;
  messages: Array<mongoose.Types.ObjectId>;
  lastMessage?: {
    content: string;
    sender: string;
    receiver: string;
    timestamp: Date;
    deliveryStatus: "sent" | "delivered" | "read";
  };
  createdAt: Date;
  updatedAt: Date;
  contractAddress?: string;

}
export interface ChatModel extends Model<IChat> {
  getChat(data: { userId: string; limit: number }): Promise<IChat | Error>;
  getChats(data: { userId: string }): Promise<IChat>;
  createChat(data: {
    type: "private" | "group";
    participants: Array<
    mongoose.Types.ObjectId
    >;
  }): Promise<IChat | Error>;
}
const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true
  },
  participants: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  lastMessage: {
    content: String,
    sender: String,
    receiver: String,
    timestamp: Date,
    deliveryStatus: String
  },
  contractAddress: String
}, {
  timestamps: true,
  
  indexes: [
    { 'participants.userId': 1 },
    { updatedAt: -1 }
  ]
});
// Create a compound index for participants in private chats
chatSchema.index({
  type: 1,
  'participants.userId': 1
}, {
  unique: true,
  partialFilterExpression: { 
    type: 'private',
    'participants.userId': { $size: 2 } // Only apply to private chats with exactly 2 participants
  }
});

// Add pre-save middleware to sort participant IDs consistently
chatSchema.pre('save', function(next) {
  if (this.type === 'private' && this.participants.length === 2) {
    // Sort participant IDs to ensure consistent ordering
    this.participants.sort((a, b) => 
      a.userId.toString().localeCompare(b.userId.toString())
    );
  }
  next();
});


chatSchema.statics.getChats = async function ({
  userId
}: {
  userId: string;
}) {
  try {
    const chat = await this.findOne({
      "participants.userId": userId,
    })
      .sort({ updatedAt: -1 })
      .populate('participants.userId', 'username avatar status')
      .lean();

    return chat;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Modify createChat to handle potential duplicates
chatSchema.statics.createChat = async function ({
  type,
  participants,
}: {
  type: "private" | "group";
  participants: Array<{
    userId: mongoose.Types.ObjectId;
  }>;
}) {
  console.log("function called")
  try {
    if (type === 'private' && participants.length === 2) {
      // Check for existing chat first
      const participantIds = participants.map(p => p.userId);
      const existingChat = await this.findOne({
        type: 'private',
        'participants.userId': { $all: participantIds }
      });

      if (existingChat) {
        return existingChat;
      }
    }
    console.log({participants});
    

    const chat: IChat = await this.create({
      type,
      participants: participants.map(p => ({
        userId: p.userId
        // q: why is the userId generated diff from the p.userId value
        //a:
      }))
    });
    return chat;
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      // Handle race condition - try to fetch the existing chat
      const participantIds = participants.map(p => p.userId);
      return await this.findOne({
        type: 'private',
        'participants.userId': { $all: participantIds }
      });
    }
    console.error(error);
    return error;
  }
};
// Enhanced Chat methods
chatSchema.statics.getChat = async function ({ userId }: { userId: string }) {
  try {
    return await this.find({
      "participants.userId": userId
    })
    .sort({ updatedAt: -1 })
    .populate('participants.userId', 'username avatar status')
    .populate({
      path: 'messages',
      options: { 
        sort: { timestamp: -1 },
        limit: 1
      }
    })
    .lean();
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Add method to get or create chat
chatSchema.statics.getOrCreateChat = async function({
  userId1,
  userId2
}: {
  userId1: string;
  userId2: string;
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // First try to find existing chat
    let chat = await this.findOne({
      type: "private",
      "participants.userId": { 
        $all: [userId1, userId2] 
      }
    }).session(session);

    if (!chat) {
      // Get user details for both participants
      const [user1, user2] = await Promise.all([
        (User as UserModel).findById(userId1).select('username walletAddress avatar').lean(),
        (User as UserModel).findById(userId2).select('username walletAddress avatar').lean()
      ]);

      if (!user1 || !user2) {
        throw new Error("One or both users not found");
      }

      // Create new chat
      const newChat = await this.create([{
        type: "private",
        participants: [
          {
            userId: user1._id,
            username: user1.username,
            walletAddress: user1.walletAddress,
            avatar: user1.avatar
          },
          {
            userId: user2._id,
            username: user2.username,
            walletAddress: user2.walletAddress,
            avatar: user2.avatar
          }
        ]
      }], { session });

      // Add chat reference to both users
      await User.updateMany(
        { _id: { $in: [userId1, userId2] } },
        { $push: { chats: newChat[0]._id } },
        { session }
      );

      chat = newChat[0];
    }

    await session.commitTransaction();
    return chat;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// Add method to get chat history
chatSchema.statics.getChatHistory = async function({
  userId,
  limit = 20,
  before = new Date()
}) {
  const chats = await this.find({
    "participants.userId": userId,
    updatedAt: { $lt: before }
  })
  .sort({ updatedAt: -1 })
  .limit(limit)
  .populate({
    path: 'messages',
    options: { 
      sort: { timestamp: -1 },
      limit: 1
    }
  })
  .lean();

  return chats;
};

export const Chat =
  (mongoose.models.Chat  || mongoose.model<IChat, ChatModel>("Chat", chatSchema))as ChatModel;

// Export the model
export const User = checkModel<Users>('User', UserSchema);

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI ="mongodb://172.17.95.109:27017/suift";

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



const testMonggose=async()=>{
    await dbConnect()
       const users=await User.find({})
       .limit(2)
       console.log({users})
       writeFileSync("userds.json",JSON.stringify(users,null,1))
   //get the id from the firts two users
   const userIObjId=new mongoose.Types.ObjectId("671ef25585582db6654c65e9")
    const user2ObjId=new mongoose.Types.ObjectId("671bdff32f7fa7592ddafac2")
 const chat = await Chat.createChat({
    type: "private",
    participants: [
       userIObjId,user2ObjId ]
  });
       const testId="671bdff32f7fa7592ddafac2"
     
  
   }
   testMonggose()
   