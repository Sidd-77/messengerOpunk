import { ChatState } from "../context/ChatProvider";
import CreateGroup from "./CreateGroup"
import SearchModal from "./SearchModal"
import {Card, CardHeader, Avatar, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ChatList from "./ChatList";

const MyChats = ({fetchAgain}) => {
    const {user} = ChatState();
    const navigate = useNavigate();

    const logoutHandler = () =>{
        localStorage.removeItem("userInfo");
        navigate("/", );
        
    }
  return (
    <div className="flex flex-col mx-2 h-screen items-stretch">
        <div className=" text-5xl font-bold flex justify-center my-5">
            Message-Punk
        </div>
        <div className="flex justify-around gap-2 my-2 h-fit">
            <SearchModal/>
            <CreateGroup/>
        </div>
        <Card className="flex-grow  my-1 overflow-y-auto">
            <ChatList fetchAgain={fetchAgain} />
        </Card>
        <Card className="flex flex-row my-2 p-2">
                <CardHeader className="text-lg w-2/3">
                    <Avatar src={user.picture} className=" mr-2"/> {user.name}
                </CardHeader>
                <Button className="w-1/3 m-2" color="danger"  onClick={logoutHandler }>Log Out</Button>
        </Card>
    </div>
  )
}
export default MyChats