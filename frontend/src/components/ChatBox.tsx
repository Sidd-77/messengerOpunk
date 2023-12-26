import {
  Card,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";
import { io } from "socket.io-client";

const ChatBox = () => {
  const { user, selectedChat } = ChatState();
  const ENDPOINT =  import.meta.env.VITE_BACKEND_URL;
  let socket = io(ENDPOINT);
  return (
    <>
      {selectedChat ? (
        <SingleChat socket={socket} />
      ) : (
        <Card className="flex m-2 flex-grow place-content-center place-items-center">
         <div className=" text-2xl">Select a user or group to chat</div>
        </Card>
      )}
    </>
  );
};
export default ChatBox;
