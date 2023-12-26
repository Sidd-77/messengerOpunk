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
  SelectSection,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserChip from "./UserChip";

const UpdateGroupChatModal = ({fetchMessages}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats, selectedChat, setSelectedChat,fetchAgain, setFetchAgain } = ChatState();
  
  useEffect(()=>{
    setGroupChatName(selectedChat.chatName);
    setSelectedUsers(selectedChat.users);
  },[fetchAgain])

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
      setFetchAgain(!fetchAgain);
      setLoading(false);
      toast.success("Chat renamed successfully");
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


  const removeSelection = async (userToRemove) => {

    if(selectedChat.groupAdmin._id !== user._id){
      toast.error("You must be admin to add or remove users");
      return;
    }

    try{
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const {data} = await axios.put('http://localhost:5000/api/chat/groupremove',{chatId:selectedChat._id, userId: userToRemove._id}, config);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      toast.success("User removed successfully");
      return;
    }catch(error){
      toast.error("error while removing user");
      return;
    }

    
  };

  const handleSelection = async (userToAdd: any) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added");
      return;
    }

    if(selectedChat.groupAdmin._id !== user._id){
      toast.error("You must be admin to add or remove users");
      return;
    }

    try{
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const {data} = await axios.put('http://localhost:5000/api/chat/groupadd',{chatId:selectedChat._id, userId: userToAdd._id}, config);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      toast.success("User added successfully");
      return;
    }catch(error){
      toast.error("error while adding user");
      return;
    }
  };

  return (
    <>
      <Button className=" bg-zinc-700 shadow-lg text-lg" onPress={onOpen}>
        Info
      </Button>
      <Toaster />
      <Modal
        backdrop="blur"
        size="5xl"
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
                  size="sm"
                />
                <Button color="primary" size="lg" onClick={handleRename} className="flex flex-row content-stretch">Update Name</Button>
                </div>
                <Divider />
                
                {/* {selected Users here} */}
                <Input
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                  placeholder="Search a user"
                  size="sm"
                />
                <div className="flex gap-2 mt-4">
                  Group Memebers : 
                  {selectedUsers?.map((u: any) => {
                    if(u._id === user._id){
                      return;
                    }
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
