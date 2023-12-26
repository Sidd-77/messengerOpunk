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
  Progress,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Info from "./Info";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import MessageBox from "./MessageBox";
import Lottie from "lottie-react";
import * as anim from "../assets/typing.json";



const SingleChat = ({socket}) => {
  const { user, selectedChat, fetchAgain, setFetchAgain } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log("connected");
    });
    socket.on('typing', ()=>setIsTyping(true));
    socket.on('stop typing', ()=>setIsTyping(false));

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
      let tmp = selectedChat.users.filter(u => u._id !== user._id);
      socket.emit("stop typing", );
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

    if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      console.log("typingg");
      let tmp = selectedChat.users.filter(u => u._id !== user._id);
      console.log(tmp);
      socket.emit("typing",tmp);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 2000;

    setTimeout(()=>{

      let timeNow = new Date().getTime();
      let timeDIff = timeNow - lastTypingTime;

      if(timeDIff >= timerLength && typing){
        let tmp = selectedChat.users.filter(u => u._id !== user._id);
        socket.emit("stop typing",tmp);
        setTyping(false);
      }

    }, timerLength)
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
    socket.on('typing', ()=>{
      console.log("other is typinggg");
      setIsTyping(true);
    });
    socket.on('stop typing', ()=>{
      console.log("Other stopped typing");
      setIsTyping(false);
    });
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
            {isTyping ? <div className="flex flex-row items-center"><div className=" h-3 p-2 w-10 "> <Progress className="" isIndeterminate size="sm" /> 
             </div>Typing...</div>: <></>}
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
