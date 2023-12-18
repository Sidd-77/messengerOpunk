import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import Login from "../components/Login";
import Signup  from "../components/Signup";

const Homepage = () => {
  const [isLogin, setisLogin] = useState(true);


  return (
    <div className="flex flex-row h-screen">
      <div className="w-3/6 bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent bg-black  h-screen flex  flex-col items-start  ">
        <div className="h-1/3"></div>
        <div className="h-1/3 ml-5">
          <p className="text-8xl mb-5 font-bold ">Message Punk</p>
          <p className="text-2xl font-medium">
            This is web-based chat-app build using React, Express, Node,
            MongoDB, Socket.io and NextUI
          </p>
        </div>
        <div className="h-1/3"></div>
      </div>
      <div className="w-3/6 h-screen flex items-center bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <Card className="flex w-full m-10 shadow-2xl ">
          <CardHeader className="flex-row gap-2">
            <Button
              onClick={() => setisLogin(true)}
              className=" basis-1/2  bg-cyan-500 font-medium	text-lg	 "
              color="primary"
            >
              Login
            </Button>
            <Button
              onClick={() => setisLogin(false)}
              className=" basis-1/2 bg-fuchsia-500 font-medium	text-lg	"
              color="secondary"
            >
              SignUp
            </Button>
          </CardHeader>
          <CardBody className="flex-row gap-2">
            {isLogin ? (
              <Login/>
            ) : (
              <Signup/>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default Homepage;
