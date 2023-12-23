import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();
  console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Card className="flex m-2 flex-grow place-content-center place-items-center">
         <div className=" text-2xl">Select a user or group to chat</div>
        </Card>
      )}
    </>
  );
};
export default ChatBox;
