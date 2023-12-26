import { Avatar } from "@nextui-org/react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../context/ChatProvider";
 

const MessageBox = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed className=" overflow-y-auto flex gap-2 flex-col" forceScroll={true} >
      {messages?.map((m, i) => {
        if (user._id === m.sender._id) {
          return (
            <div key={m._id} className="flex flex-row gap-2 justify-end">
              <div className="flex flex-row bg-teal-600 rounded-b-2xl rounded-l-2xl p-2">
                {m.content}
              </div>
              <Avatar src={m.sender.picture} className="bg-teal-900" style={{width:40, minWidth:40}}/>
            </div>
          );
        } else {
          return (
            <div key={m._id} className="flex gap-2">
              <Avatar src={m.sender.picture} className=" bg-blue-900" style={{width:40, minWidth:40}}/>
              <div className="flex flex-row bg-blue-600 rounded-b-2xl rounded-r-2xl p-2">
                {m.content}
              </div>
            </div>
          );
        }
      })}
    </ScrollableFeed>
  );
};
export default MessageBox;
