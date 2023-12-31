import { ChatState } from "../context/ChatProvider"
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const Chatpage = () => {
  const {user} = ChatState();
  
  return (
    <div className=" h-screen flex flex-row bg-gradient-to-r from-fuchsia-700 to-cyan-600">
      
      <div className=" basis-2/6 ">
        {user && <MyChats  />}
      </div>
      <div className="flex flex-col basis-4/6 ">
        {user && <ChatBox  />}
      </div>
    </div>
  )
}
export default Chatpage