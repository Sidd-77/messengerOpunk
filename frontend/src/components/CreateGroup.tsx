import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserChip from "./UserChip";

const CreateGroup = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

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
      setSearchResult(data);
      console.log(data);
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
    if(selectedUsers.length <2){
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

      setChats([data, ...chats])
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
      <Button className="w-1/2 bg-cyan-500 shadow-lg text-lg" onPress={onOpen}>
        Create Group
      </Button>
      <Toaster />
      <Modal
        backdrop="blur"
        size="full"
        className="dark text-foreground bg-background"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Group Chat
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <Input
                  onChange={(e) => setGroupChatName(e.target.value)}
                  value={groupChatName}
                  placeholder="Group Name"
                />
                <Input
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                  placeholder="Search a user"
                />
                {/* {selected Users here} */}

                <div className="flex gap-2">
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={loading} color="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateGroup;
