"use client";
import { Coins, Mic, Paperclip, Send, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import TextControl from "./TextControl";
import { useChatContext } from "@/hooks/useChatContext";
import { getChatMessages } from "@/actions/dbFunctions";

const dummyChat = [
  {
    id: 1,
    message: "Welcome to Suift Messenger",
    time: "12:34 PM",
    type: "received",
  },
  {
    id: 2,
    message:
      "Experience secure, decentralized communication built on the Sui Blockchain",
    time: "12:34 PM",
    type: "received",
  },
  {
    id: 3,
    type: "sent",
    message: "tell me more",
    time: "12:34 PM",
  },
  {
    id: 4,
    type: "sent",
    message:
      "Suift Messenger is a decentralized chat application built on the Sui blockchain",
    time: "12:34 PM",
  },
  {
    id: 5,
    type: "received",
    message: "And it is still under development",
    time: "12:34 PM",
  },
];
const ChatList = () => {
  const { activeUser } = useChatContext();
  const [messages, setMessages] = useState(dummyChat);

  useEffect(() => {
    console.log("fetching", activeUser);
    (async () => {
      if(!activeUser.chatId){
        return (setMessages(dummyChat));;
      }
      const messages = JSON.parse(await getChatMessages(activeUser.chatId));
      setMessages(messages.messages)
      console.log({ messages });
    })();
  }, [activeUser._id]);

  return (
    <div className="flex  flex-col w-full  relative  h-full">
      <div
        id="chatContainer"
        className="flex-1  flex hide-scrollbar  flex-col  h-full  overflow-hidden  relative overflow-y-auto p-4 space-y-2"
      >
        {messages.map((chat, i) => (
          <div
            key={i}
            className={` flex ${chat.type === "sent" ? "justify-end" : ""}`}
          >
            <div
              className={`sm:max-w-xs max-w-[90%] ${
                chat.type === "sent" ? "bg-purple-900" : "bg-gray-800"
              } rounded-lg p-3`}
            >
              <p className="font-suse text-sm">{chat.message}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {chat.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4  h-fit w-full place-content-center flex pt-1 bg-ray-900">
        <TextControl />
      </div>
    </div>
  );
};

export default ChatList;
