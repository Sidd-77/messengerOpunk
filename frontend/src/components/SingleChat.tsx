import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Skeleton,
  Input,
  Button,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Info from "./Info";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import MessageBox from "./MessageBox";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client/debug";

const SingleChat = ({socket}) => {
  const { user, selectedChat, fetchAgain, setFetchAgain } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const chatName = selectedChat.isGroupChat
    ? selectedChat.chatName
    : user._id === selectedChat.users[0]._id
    ? selectedChat.users[1].name
    : selectedChat.users[0].name;

  const selected =
    user._id === selectedChat.users[0]._id
      ? selectedChat.users[1]
      : selectedChat.users[0];

  const ENDPOINT = "http://localhost:5000";
  
  let selectedChatCompare;

  useEffect(()=>{
    fetchMessages();
  },[selectedChat]);

  useEffect(() => {
    
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("connected");
    });
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
      
      socket.emit("join chat", user._id);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching messages");
    }
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );
      setNewMessage("");
      console.log(messages, data);
      setMessages([...messages, data]);
      
      socket.emit("new message", data);
    } catch (error) {
      toast.error("Error while sending message");
      return;
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const keepaLive = () => {
    socket.on("message received", (newMessageRecieved) => {
      console.log("hit hit hit");
      if (user._id === newMessageRecieved.sender._id) {
        console.log("THis mf is getting");
      } else {
        let tmp = [...messages, newMessageRecieved];
        console.log(tmp);
        setMessages(tmp);
      }
    });
  };

  

  useEffect(() => {
    console.log("listening");
    keepaLive();
  });

  return (
    <>
      <Card className="flex m-2 flex-grow">
        <CardHeader className=" text-lg flex justify-between gap-3">
          <Avatar />
          {chatName}
          {selectedChat.isGroupChat ? (
            <UpdateGroupChatModal fetchMessages={fetchMessages} />
          ) : (
            <Info key={selectedChat._id} data={selected} />
          )}
        </CardHeader>

        <Divider />

        <CardBody className=" basis-10/12">
          {loading ? (
            <div className="flex flex-col gap-2 ">
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14" />
            </div>
          ) : (
            <div>
              <MessageBox messages={messages} />
            </div>
          )}
        </CardBody>

        <Divider />

        <CardFooter className="flex gap-2 items-center ">
          <Input
            size="sm"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => typingHandler(e)}
            value={newMessage}
            
            
          />
          <Button color="danger" size="lg" className="" onClick={sendMessage}>
            <AiOutlineSend className=" text-3xl" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default SingleChat;
