import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";


const ChatBox = () => {
  const { user, selectedChat } = ChatState();
  const ENDPOINT = "http://localhost:5000";
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
