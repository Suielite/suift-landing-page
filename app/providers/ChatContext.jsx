"use client";

import { createChat, getChats } from "@/actions/dbFunctions";
import { dummyUsers } from "@/components/ChatNavs";
import useAuth from "@/hooks/useAuth";
import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  /**{
    "_id": string,
    "username": string,
    "status": "offline"|"online"
} */
  const [activeUser, setActiveUser] = useState(dummyUsers);
const {Auth} =useAuth()
  const [chats,setChats] = useState(null);
console.log({Auth})
  useEffect(() => {
    //get all chats
    (async()=>{
      try{

        const chats = JSON.parse(await getChats(Auth.id));
if(chats){

  setChats(chats)
  console.log("reached",{chats:chats.participants})
}
      } 
      catch(err){
        console.log({err})
      }
      
      
    // const resp=  await createChat({senderId:"671ef25585582db6654c65e9",receiverId:"671bdff32f7fa7592ddafac2"})
    //  console.log({resp})
    })()
  

  }, [Auth]);

  return (
    <ChatContext.Provider
      value={{
        activeUser,
        setActiveUser,
        chats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
