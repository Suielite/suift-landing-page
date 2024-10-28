"use server"
import dbConnect from "@/lib/db/dbConnect";
import { Chat, IChat } from "@/lib/db/models/chat";
import { Message,MessageModel } from "@/lib/db/models/message";
import { User, UserModel } from "@/lib/db/models/user";




export const getUsersFromRegex = async (regex: string) => {
    await dbConnect();
    console.log({regex})
     const resp=await (User as UserModel).getUsersFromRegex({ regex });
     console.log({resp})
  return resp;
}

export const createChat = async ({
  senderId,
  receiverId
}: {
  senderId: string;
  receiverId: string;

}) => {
    await dbConnect();
    const chat = await Chat.createChat({
      type: "private",
      participants: [
        senderId,receiverId
      ]
    });
    console.log({chat},"chat created")
    return JSON.stringify(chat);
}


export const getChats = async (userId: string):Promise<string> => {

  await dbConnect();
  try{

    const chats = await Chat.getChats({userId});
    console.log({chats},"chats")
    return JSON.stringify(chats);
  }
  catch(err){
    console.log({err})
    throw new Error("No chats found");
  }

}

export const getChatMessages=async (chatId:string): Promise<string>=>{
await dbConnect()

const chats= await Message.getMessages({chatId})

console.log("demesa",{chats})

return JSON.stringify(chats)





}

export const addMessage = async ({
  chatId,
  userId,
  username,
  message
}: {
  chatId: string|null;
  userId: string;
  username: string;
  message: string;
}) => {
  await dbConnect();
  await Message.addMessage({
      chatId,
      sender: {
        _id: userId,
        username,
        walletAddress: '' // Add the actual wallet address if needed
      },
      content: message,
      contentType: 'text'
    });
}


