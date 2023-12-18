import {
  Button,
  Input,
} from "@nextui-org/react";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import axios from "axios";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const setGuestUser = () => {
    setEmail("u1@gmail.com");
    setPassword("u1");
  }

  const submitHandler = async() => {
    setLoading(true);
    if(!password || !email ){
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    try{
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const {data} = await axios.post('http://localhost:5000/api/user/login',{name, email, password}, config);

      toast.success("Logged In");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

    }catch(error:any){
      toast.error(`Error: ${error.message}`);
    }
  }

  return (
    <form className="flex flex-col gap-5 m-5 w-full ">
      <Input
        key={0}
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        labelPlacement={"inside"}
        className="flex"
        id="email"
      />

      <Input
        key={0}
        type="password"
        label="Password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        labelPlacement={"inside"}
        className="flex"
      />

      <Button color="primary" size="lg" className="font-medium" isLoading={loading} onClick={submitHandler}>
        Login
      </Button>
      <Button color="success" className=" text-white font-medium" size="lg" onClick={setGuestUser}>
        Guest User
      </Button>
    </form>
  );
};
export default Login;
