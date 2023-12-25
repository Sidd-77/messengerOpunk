import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Info from "./Info";

const SingleChat = () => {
  const { user, selectedChat, fetchAgain, setFetchAgain } = ChatState();
  const chatName = selectedChat.isGroupChat
    ? selectedChat.chatName
    : user._id === selectedChat.users[0]._id
    ? selectedChat.users[1].name
    : selectedChat.users[0].name;

  const selected = user._id === selectedChat.users[0]._id
  ? selectedChat.users[1]
  : selectedChat.users[0];

  return (
    <>
      {selectedChat.isGroupChat?(
      <Card className="flex m-2 flex-grow">
        <CardHeader className=" text-lg flex justify-between gap-3">
          <Avatar />
          {chatName}
          <UpdateGroupChatModal />
        </CardHeader>
        <Divider />
        <CardBody className=" overflow-y-auto">Messages</CardBody>
        <Divider />
        <CardFooter>Text Input</CardFooter>
      </Card>
      ):(
      <Card className="flex m-2 flex-grow">
        <CardHeader className=" text-lg flex justify-between gap-3">
          <Avatar />
          {chatName}
          <Info key={selectedChat._id} data={selected} />
        </CardHeader>
        <Divider />
        <CardBody className=" overflow-y-auto">Messages</CardBody>
        <Divider />
        <CardFooter>Text Input</CardFooter>
      </Card>
      )}
    </>
  );
};
export default SingleChat;
