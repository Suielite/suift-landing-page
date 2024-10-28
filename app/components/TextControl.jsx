"use client"

import { addMessage } from '@/actions/dbFunctions';
import { useChat, useFileUpload, useTyping } from '@/hooks/useChat';
import { Message } from '@/lib/db/models/message';
import { Coins, Mic, Paperclip, Send, Smile } from 'lucide-react';
import React, { useRef, useState } from 'react';

const TextControl = ({setChats,chats, chatId, 
  userId,
  username }) => {

  const { messages, loading: messagesLoading } = useChat(chatId);
  const { isTyping, setIsTyping, typingUsers } = useTyping(chatId, userId, username);
  const { uploadFile, uploading, progress } = useFileUpload(chatId);
  const [editingMessage, setEditingMessage] = useState(null);
  const [message, setMessage] = useState('');

  // Get all unique user IDs from messages
  const userIds = [...new Set(messages.map(m => m.sender._id))];

  const handleDelete = async (messageId) => {
    await FirebaseChat.deleteMessage(chatId, messageId);
  };

  const handleEdit = async (messageId, newContent) => {
    await FirebaseChat.editMessage(chatId, messageId, newContent);
    setEditingMessage(null);
  };

  // const handleFileUpload = async (file) => {
  //   const url = await uploadFile(file);
  //   // Send message with file URL
  //   await Message.addMessage({
  //     chatId,
  //     sender: { _id: userId, username, walletAddress: '' },
  //     content: url,
  //     contentType: file.type.startsWith('image/') ? 'image' : 'file'
  //   });
  // };

  const typingTimeoutRef = useRef();

  const handleChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await onFileUpload(file);
    }
  };

    const simulateResponse = async (currChats) => {
        const response = await fetch(
          "https://api.chucknorris.io/jokes/random?category=dev"
        );
        const data = await response.json();
        setChats([
          ...currChats,
          {
            id: crypto.getRandomValues(new Uint32Array(1))[0],
            message: data.value,
            time: "12:34 PM",
            type: "received",
          },
        ]);
        //scroll to the bottom of the chat container
        const chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      };

    // const handleSend = async () => {
    //     const message = document.getElementById("message").value;
    //     if (!message) return;
    
    //     setChats([
    //       ...chats,
    //       {
    //         id: crypto.getRandomValues(new Uint32Array(1))[0],
    //         message,
    //         time: "12:34 PM",
    //         type: "sent",
    //       },
    //     ]);
    //     document.getElementById("message").value = "";
    //     //scroll to the bottom of the chat container
    //     const chatContainer = document.getElementById("chatContainer");
    //     chatContainer.scrollTop = chatContainer.scrollHeight;
    //     setTimeout(async () => {
    //       await simulateResponse([
    //         ...chats,
    //         {
    //           id: crypto.getRandomValues(new Uint32Array(1))[0],
    //           message,
    //           time: "12:34 PM",
    //           type: "sent",
    //         },
    //       ]);
    //     }, 1000);
    //   };

    
  // Create a unique chat room ID for these two users


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    try {
      
     await addMessage(chatId, userId, username, message);


      // Clear the input after successful send
      setMessage('');
      // Clear typing indicator
     // onTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Create reference to the specific chat room
      const chatRoomRef = ref(database, `chats/${chatRoomId}/messages`);
      const messageRef = push(chatRoomRef);
      const firebaseKey = messageRef.key;

      const messageData = {
        text: message,
        senderId: currentUser.id,
        senderName: currentUser.name,
        receiverId: otherUser.id,
        receiverName: otherUser.name,
        timestamp: Date.now(),
        firebaseKey,
        read: false
      };

      // Save to Firebase
      await set(messageRef, messageData);

      // Save to MongoDB
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('Failed to save message to MongoDB');
      }

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
    return (
        <>
            <form onSubmit={handleSubmit}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleSend();
          // }}
          className="w-full "
        >
          <div className="flex w-full items-center bg-gray-950 px-3 rounded-full">
            <div className="flex w-fit items-center sm:space-x-2 space-x-2 ">
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Smile size={20} className="text-purple-600" />
              </button>
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Coins size={20} className="text-purple-600" />
              </button>
            </div>
            <input
              type="text"
              id="message"
              
              value={message}
              onChange={handleChange}
              placeholder="Type a message"
              className="flex-1 w-full bg-transparent p-3 focus:outline-none text-gray-300"
            />
            <div className="flex items-center w-fit space-x-2 sm:px-3 ">
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Paperclip size={20} className="text-purple-600" />
              </button>
              <button className="sm:p-2 p-0 rounded-full hidden sm:inline hover:bg-gray-700">
                <Mic size={20} className="text-purple-600" />
              </button>
              <button
                // onClick={handleSend}
                type='submit'
                className="p-2 rounded-full bg-purple-800 hover:bg-purple-900"
              >
                <Send size={20} className="text-gray-200" />
              </button>
            </div>
          </div>
        </form> 
        </>
    );
};

export default TextControl;

