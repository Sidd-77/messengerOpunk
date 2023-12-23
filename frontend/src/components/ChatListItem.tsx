import { Avatar, Card } from "@nextui-org/react";

const ChatListItem = ({ data, name, avatar, setCurrent, isSelected }) => {
  const tmp = isSelected ? " bg-teal-600 " : "";

  return (
    <div onClick={setCurrent}>
      <Card
        className={"flex-row items-center gap-2 m-2 p-2 cursor-pointer " + tmp}
        onClick={setCurrent}
      >
        <Avatar src={avatar} />
        {name}
      </Card>
    </div>
  );
};
export default ChatListItem;
