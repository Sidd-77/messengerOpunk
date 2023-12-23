import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserChip from "./UserChip";

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  
  useEffect(()=>{
    setGroupChatName(selectedChat.chatName);
    setSelectedUsers(selectedChat.users);
  },[])

  const handleRename = async ()=>{
    try{
      setLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };

      const {data} = await axios.put('http://localhost:5000/api/chat/rename',{chatId:selectedChat._id, chatName:groupChatName},config);
      setSelectedChat(data);
      // setFetchAgain(!fetchAgain);
      setLoading(false);
      return;
    }catch(error){
      console.log(error);
      toast.error("Error while renaming chat");
      setLoading(false);
      return;
    }
  }


  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user/?search=${query}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
      return;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill required fields");
      return;
    }
    if (selectedUsers.length < 2) {
      toast.error("Need at least 2 users");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          isGroupChat: true,
        },
        config
      );

      setChats([data, ...chats]);
      setLoading(false);
      return;
    } catch (error) {
      toast.error(error.error.message);
      return;
    }
  };

  const removeSelection = (userToRemove) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToRemove._id)
    );
  };

  const handleSelection = (userToAdd: any) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added");
      return;
    }
    setSelectedUsers([userToAdd, ...selectedUsers]);
    return;
  };

  return (
    <>
      <Button className=" bg-zinc-700 shadow-lg text-lg" onPress={onOpen}>
        Info
      </Button>
      <Toaster />
      <Modal
        backdrop="blur"
        size="md"
        className="dark text-foreground bg-background"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Group Info
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                <Input
                  onChange={(e) => setGroupChatName(e.target.value)}
                  value={groupChatName}
                  placeholder="Group Name"
                  className=" flex-grow"
                />
                <Button color="primary" size="lg" onClick={handleRename} className="flex flex-row content-stretch">Update Name</Button>
                </div>
                
                
                {/* {selected Users here} */}

                <div className="flex gap-2 mt-4">
                  Group Memebers : 
                  {selectedUsers?.map((u: any) => {
                    return (
                      <UserChip
                        key={u._id}
                        data={u}
                        handlefuction={() => removeSelection(u)}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-col overflow-y-auto gap-1">
                  {searchResult?.map((u: any) => {
                    return (
                      <UserListItem
                        key={u._id}
                        data={u}
                        handlefuction={() => handleSelection(u)}
                      />
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger"  onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdateGroupChatModal;
