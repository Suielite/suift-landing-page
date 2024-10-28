"use client";
import { PersonIcon } from "@/(auth)/_components/MobileAuth";
import { Button } from "@/components/ui/button";
import GrainyBackground from "@/components/GrainyBackground";
import SendSui from "@/components/SendSui";
import SideBarChat from "@/components/SideBarChat";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Settings,
  User,
  ChevronDown,
  LogOut,
  Search,
  MoreVertical,
  Home,
  Copy,
  Workflow,
  X,
  ListMinusIcon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useChatContext } from "@/hooks/useChatContext";
import useAuth from "@/hooks/useAuth";

export default function Component({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { activeUser,chats } = useChatContext();
  console.log("main",chats)
  return (
    <div className="h-[94vh] sm:h-screen  bg-orange-400 w-full  relative ">
      <div className="flex h-full relative overflow-hidden  bg-gray-950 text-gray-300">
        <GrainyBackground className=" h-full  w-full">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 w-full h-full  overflow-hidden flex flex-col ">
            <div className="p-4  h-[80px] bg-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListMinusIcon
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="sm:hidden"
                />
                <div className="bg-orange-400 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2">
                  <PersonIcon className="size-full fill-orange-700 rounded-full text-white stroke-white" />
                </div>
                <div className=" relative">
                  <h2 className="sm:text-xl text-sm font-bold text-slate-300">
                    {activeUser.username}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="sm:text-sm text-xs flex cursor-pointer text-gray-500">
                          0x1234...5678
                          <ChevronDown className="inline ml-1" size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="p-0">
                        <div className="relative inline-block">
                          {/* Tooltip */}
                          <div className="bg-purle-700 border-purple-400 border text-white text-sm rounded-lg shadow-lg  max-w-xs">
                            <div className="flex items-center ">
                              <span className="font-mono p-2 pr-0 text-xs">
                                0x12340x123456780x123456785678
                              </span>
                              <div className=" group cursor-pointer p-3">
                                <Copy
                                  size={16}
                                  className="ml-2 group-active:stroke-purple-700  stroke-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-blue-800 text-gray-200 flex items-center px-4 py-2 rounded-full mr-2">
                  <span className="sm:inline hidden">
                    Currently in development
                  </span>
                  <span className="inline sm:hidden">Dev</span>
                  <Workflow size={16} className="ml-1" />
                </span>
                <SendSui />
                <button className="p-2 rounded-full hover:bg-gray-800">
                  <MoreVertical size={24} className="text-purple-600" />
                </button>
              </div>
            </div>
            <div className="h-full overflow-hidden flex flex-col sm:flex-row w-full">
              {children}
            </div>
          </div>
        </GrainyBackground>
      </div>
    </div>
  );
}
export const dummyUsers = 
{
  "_id": "0000000",
  "username": "Suift Admin",
  "status": "online"
}
const SideBar = ({ isOpen, setIsOpen }) => {
  const { activeUser, setActiveUser,chats } = useChatContext();
  console.log("sidebar",chats)
const {Auth}= useAuth()

  
  useEffect(() => {
    setActiveUser(dummyUsers);
  }, []);

  return (
    <div
      className={clsx(
        "w-80 sm:relative z-[30]  bg-gray-900 absolute left-0 net-0 tp-0 h-full shrink-0  flex-col border-r border-gray-800",
        {
          "sm:flex hidden": !isOpen,
        }
      )}
    >
      <div className="p-4 h-[80px] flex justify-between items-center bg-gray-900">
        <div className="flex gap-4">
          <Link href="/" className="">
            <Home className=" " />
          </Link>
          <h1 className="text-xl font-bold text-slate-300">3Lite Chat</h1>
        </div>
        <div className="">
          <button className="flex place-content-center">
            <Web3MessengerDropdown>
              <MoreVertical size={24} className="text-slate-300" />
            </Web3MessengerDropdown>
          </button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="p-2 sm:hidden rounded-full hover:bg-gray-800"
          >
            <X size={24} className="text-slate-300" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <SideBarChat />
      </div>
      <div className="flex-1 overflow-y-auto h-full mb-3 hide-scrollbar ">
      <ChatComponent
            i={1}
            setActiveUser={setActiveUser}
            user={dummyUsers}
            activeUser={activeUser}
          />
        {chats?.map((user, i) => (
          <ChatComponent
            key={i}
            i={user._id.toString()}
            setActiveUser={setActiveUser}
            user={{
              ...user.participants.filter((p)=>p._id!=Auth.id
            )[0].userId,chatId:user._id}
            }
            activeUser={activeUser}
          />
        ))}
      </div>
    </div>
  );
};

const Web3MessengerDropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    // Add your navigation logic here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={toggleDropdown}
      className="relative  rounded-full hover:bg-gray-800 p-2 inline-block text-left"
      ref={dropdownRef}
    >
      <div className="size-fit">{children}</div>

      {isOpen && (
        <div className="absolute overflow-hidden right-0 mt-2 p-0 w-[180px] shrink-0 rounded-[20px] shadow-lg bg-gray-800 ring-1  ring-opacity-5 divide-y divide-gray-100 z-10">
          <div
            className=" "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href={"/profile"}
              onClick={() => handleOptionClick("profile")}
              className="flex shrink-0 items-center px-4 py-3 text-sm text-slate-200 hover:bg-gray-700 hover:text-purple-100 w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <User className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
              View Profile
            </Link>
            <button
              onClick={() => handleOptionClick("settings")}
              className="flex items-center px-4 py-3 pb-4 text-sm text-slate-200 hover:bg-gray-700 hover:text-purple-100 w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <Settings
                className="mr-3 h-5 w-5 text-white"
                aria-hidden="true"
              />
              Settings
            </button>
          </div>
          <div className="">
            <button
              onClick={() => handleOptionClick("logout")}
              className="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-gray-700  w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <LogOut
                className="mr-3 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatComponent = ({ user, i, setActiveUser, activeUser }) => {
  console.log({user});
  
  return (
    <div
      key={i}
      onClick={() => {
        setActiveUser(user);
      }}
      className={clsx(
        "flex items-center p-4 gap-3 hover:bg-opacity-80 cursor-pointer",
        {
          "bg-gray-800": activeUser?._id === user?._id,
          "hover:bg-gray-800 hover:bg-opacity-30": activeUser?._id !== user?._id,
        }
      )}
    >
      <div className="bg-orange-400 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2">
        <PersonIcon className="size-full fill-orange-700 rounded-full text-white stroke-white" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-slate-300">{user.username}</h3>
          <span className="text-xs text-gray-500">
            {
              // new Date().toLocaleTimeString([], {
              // q:Error: Text content does not match server-rendered HTML.See more info here: https://nextjs.org/docs/messages/react-hydration-error
              //a:Fixed by removing the square brackets
              new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">Last message here...</p>
      </div>
    </div>
  );
};

const NewUserChatComponent = ({ user, i, setActiveUser, activeUser }) => {
  return (
    <div
      key={i}
      onClick={() => {
        setActiveUser(user);
      }}
      className={clsx(
        "flex items-center p-4 gap-3 hover:bg-opacity-80 cursor-pointer",
        {
          "bg-gray-800": activeUser === user,
          "hover:bg-gray-800 hover:bg-opacity-30": activeUser !== user,
          "bg-purple-900/30": true, // Always apply this background for new users
        }
      )}
    >
      <div className="bg-purple-500 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2 flex items-center justify-center">
        <UserPlus className="size-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-slate-300">{user.username}</h3>
          <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
            New
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          No messages yet. Start a new chat!
        </p>
      </div>
    </div>
  );
};
