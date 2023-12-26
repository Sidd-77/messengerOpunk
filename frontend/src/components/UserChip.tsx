import { Chip } from "@nextui-org/react"
import { ChatState } from "../context/ChatProvider";


const UserChip = ({data,handlefuction}) => {
  const { user, chats, setChats, selectedChat, setSelectedChat,fetchAgain, setFetchAgain } = ChatState();
  let tmp = selectedChat.groupAdmin._id === data._id? "secondary": "primary";
  return (
    <Chip color={tmp} variant="shadow" onClose={handlefuction} className={"p-2"}>
        {data.name}
    </Chip>
  )
}
export default UserChip