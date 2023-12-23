import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";


const SearchModal =  () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const {user, setSelectedChat, chats, setChats} = ChatState();

    const accesChat = async (u:any)=>{

      try{
        setLoading(true);
        const config = {
          headers: {
              "Content-type": "application/json",
              Authorization: "Bearer "+user.token,
          }
        }
        const {data} = await axios.post('http://localhost:5000/api/chat', {userId: u._id}, config);

        if(!chats.find((c:any)=> c._id == data._id)) setChats([data, ...chats]);

        setSelectedChat(data);
        setLoading(false);
        return;
        
      }catch(error:any){
        toast.error(error.message);
      }
    }
    const handleSearch = async ()=> {
        setLoading(true);
        if(!search){
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: "Bearer "+user.token,
                }
            }
            const {data} = await axios.get(`http://localhost:5000/api/user/?search=${search}`, config);
            setSearchResult(data);
            setLoading(false);
            return;
        } catch (error) {
            toast.error("Failed to load search results");
            setLoading(false);
            return;
        }
    }
  return (
    <>
      <Button className=" w-1/2 bg-cyan-500 shadow-lg text-lg"   onPress={onOpen}>Search User</Button>
      <Toaster/>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className="dark text-foreground bg-background">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search User
              </ModalHeader>
              <ModalBody>
                <Input onChange={(e)=>setSearch(e.target.value)} value={search}/>
              </ModalBody>
              <ModalBody>
                {
                  searchResult.map((u:any)=>{
                    return <UserListItem key={u._id} data={u} handlefuction={()=>accesChat(u)}/>;
                  })
                }
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loading} onClick={handleSearch}>
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
