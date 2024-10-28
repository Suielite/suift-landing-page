"use server"
import mongoose, { Model } from "mongoose";
import { Chat, ChatModel } from "./chat";
import { FirebaseChat } from "@/class/firebase_chat";
import { checkModel, User, UserModel } from "./user";

export interface IMessage {
  _id: string;
  chat: mongoose.Types.ObjectId;
  sender: {
    _id: mongoose.Types.ObjectId;
    username: string;
    walletAddress: string;
    avatar?: string;
  };
  receiver: {
    _id: mongoose.Types.ObjectId;
    username: string;
    walletAddress: string;
    avatar?: string;
  };
  content: string;
  contentType: "text" | "image" | "file";
  timestamp: Date;
  deliveryStatus: "sent" | "delivered" | "read";
  deliveredAt?: Date;
  readAt?: Date;
  transactionHash?: string;
  blockchainStatus?: "pending" | "confirmed";
}


// models/Message.ts
const messageSchema = new mongoose.Schema<IMessage, MessageModel>({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
    index: true
  },
  sender: {
    _id: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true 
    },
    username:  { type: String, required: true },
    walletAddress: String,
    avatar: String
  },
  receiver: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    walletAddress: String,
    avatar: String
  },
  content: {
    type: String,
    enum: ["text", "image", "file"],
    required: true
  },
  contentType: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text"
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent"
  },
  deliveredAt: Date,
  readAt: Date,
  transactionHash: String,
  blockchainStatus: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending"
  }
});
export interface MessageModel extends Model<IMessage> {
  getMessages(data: {
    chatId: string;
    limit?: number;
  }): Promise<Array<IMessage> | Error>;
  addMessage(data: {
    chatId: string|null;
    sender: string;
    reciever:string;
    
    content: string;
    contentType: "text" | "image" | "file";
  }): Promise<IMessage | Error>;
  updateDeliveryStatus(messageId: string, status: "delivered" | "read"): Promise<IMessage | Error>;
  getUnreadCount(userId: string): Promise<number>;
}

messageSchema.statics.getMessages = async function ({
  chatId,
  limit=50,
  before,
}: {
  chatId: string;
  limit?: number;
  before?: string;
}) {
  const query: any = { chatId };
  if (before) {
    query.timestamp = { $lt: new Date(before as string) };
  }
  const messages = await this.find(query)
    .sort({ timestamp: -1 })
    .limit(Number(limit))
    .lean();
  // Include total count for pagination info
  const totalCount = await Message.countDocuments({ chatId });
  
  return {
    messages,
    hasMore: messages.length === Number(limit),
    totalCount,
  };
};

// Enhanced Message methods
messageSchema.statics.addMessage = async function ({
  chatId=null,
  sender,
  receiver,
  content,
  contentType
}: {
  chatId?: string|null;
  sender: string;
  receiver: string;
  content: string;
  contentType: "text" | "image" | "file";
}) {
  const session = await mongoose.startSession();
  session.startTransaction();
  let chat = chatId ? 
  await mongoose.model('Chat').findById(chatId).session(session) :
  await mongoose.model('Chat').findOne({
    type: "private",
    "participants.userId": { $all: [sender, receiver] }
  }).session(session);;


  try {
  
    if (!chatId) {
      chat = await mongoose.model('Chat').findOne({
        type: "private",
        "participants.userId": { 
          $all: [sender, receiver] 
        }
      }).session(session);

      if (!chat) {
        // Create new chat
        chat = await mongoose.model('Chat').create([{
          type: "private",
          participants: [
            
              sender,

            
               receiver
            
          ]
        }], { session });

        // Add chat reference to both users
        await mongoose.model('User').updateMany(
          { _id: { $in: [sender, receiver] } },
          { $push: { chats: chat[0]._id } },
          { session }
        );

        chat = chat[0];
      }
      chatId = chat._id;
    }

    // Create message
    const message = await this.create([{
      chat: chatId,
      sender,
      receiver,
      content,
      contentType,
      deliveryStatus: "sent",
      timestamp: new Date()
    }], { session });

    // Update chat with new message
    await mongoose.model('Chat').findByIdAndUpdate(
      chatId,
      {
        $push: { messages: message[0]._id },
        lastMessage: {
          content,
          sender: sender.username,
          receiver: receiver.username,
          timestamp: message[0].timestamp,
          deliveryStatus: "sent"
        },
        updatedAt: new Date()
      },
      { session }
    );

    // Update sender's sent messages and receiver's received messages
    await Promise.all([
      mongoose.model('User').findByIdAndUpdate(
        sender,
        { $push: { sentMessages: message[0]._id } },
        { session }
      ),
      mongoose.model('User').findByIdAndUpdate(
        receiver,
        { $push: { receivedMessages: message[0]._id } },
        { session }
      )
    ]);

    // Sync with Firebase
    if (chat) {
      await FirebaseChat.syncChat(chat.toObject());
      await FirebaseChat.syncMessage(message[0].toObject());
    }

    await session.commitTransaction();
    return {
      message: message[0],
      chat,
      isNewChat: !chatId && !chat
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// Method to update message delivery status
messageSchema.statics.updateDeliveryStatus = async function(
  messageId: string,
  status: "delivered" | "read"
) {
  const message = await this.findById(messageId);
  if (!message) throw new Error("Message not found");

  const updateData: any = {
    deliveryStatus: status
  };

  if (status === "delivered") {
    updateData.deliveredAt = new Date();
  } else if (status === "read") {
    updateData.readAt = new Date();
  }

  // Update message status
  await this.findByIdAndUpdate(messageId, updateData);

  // Update chat's last message if this was the last message
  const chat = await (Chat as ChatModel).findById(message.chat);
  if (chat?.lastMessage?.timestamp.getTime() === message.timestamp.getTime()) {
    chat.lastMessage.deliveryStatus = status;
    await chat.save();
  }

  // Sync with Firebase
  await FirebaseChat.syncMessage(message.toObject());

  return message;
};

// Method to get unread messages count for a user
messageSchema.statics.getUnreadCount = async function(userId: string) {
  return this.countDocuments({
    'receiver._id': userId,
    deliveryStatus: { $ne: "read" }
  });
};
// Add method to get messages between two users
messageSchema.statics.getMessagesBetweenUsers = async function({
  userId1,
  userId2,
  limit = 50,
  before = new Date()
}) {
  // First find the chat between these users
  const chat = await (Chat as ChatModel).findOne({
    type: "private",
    "participants.userId": { 
      $all: [userId1, userId2] 
    }
  });

  if (!chat) {
    return [];
  }

  return this.find({
    chat: chat._id,
    timestamp: { $lt: before }
  })
  .sort({ timestamp: -1 })
  .limit(limit)
  .lean();
};
export const Message = checkModel('Message', messageSchema) as MessageModel;