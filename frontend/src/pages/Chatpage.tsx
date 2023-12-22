import { ChatState } from "../context/ChatProvider"
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatpage = () => {
  const {user} = ChatState();
  return (
    <div className=" h-screen flex flex-row">
      
      <div className=" basis-2/6 bg-gray-900">
        {user && <MyChats/>}
      </div>
      <div className=" basis-4/6 bg-teal-500">
        {user && <ChatBox/>}
      </div>
    </div>
  )
}
export default Chatpage