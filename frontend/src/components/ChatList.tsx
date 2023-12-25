import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import ChatListItem from "./ChatListItem";
import axios from "axios";
import toast from "react-hot-toast";

const ChatList = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats, selectedChat, fetchAgain } = ChatState();


  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      setChats(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div>
      {chats?.map((chat) => {
        if (chat.isGroupChat) {
          return (
            <ChatListItem
              isSelected={selectedChat?._id === chat._id}
              key={chat._id}
              data={chat}
              name={chat.chatName}
              setCurrent={()=>setSelectedChat(chat)}
              avatar={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50LBy6OpU2U2qx6lrwxbcx68vuZcl7tWUHQ&usqp=CAU"
              }
            />
          );
        } else {
          let tmp =
            loggedUser?._id === chat.users[0]._id
              ? chat.users[1]
              : chat.users[0];
          return (
            <ChatListItem
              isSelected={selectedChat?._id === chat._id}
              key={chat._id}
              data={chat}
              name={tmp.name}
              avatar={tmp.picture}
              setCurrent={()=>setSelectedChat(chat)}
            />
          );
        }
      })}
    </div>
  );
};
export default ChatList;
