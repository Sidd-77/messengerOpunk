import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async() => {
    setLoading(true);
    if(!name || !password || !email ){
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

      const {data} = await axios.post('http://localhost:5000/api/user/',{name, email, password}, config);

      toast.success("Registration successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats", );

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
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        labelPlacement={"inside"}
        className="flex"
      />

      <Input
        key={0}
        type="name"
        label="Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        labelPlacement={"inside"}
        className="flex"
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

      <Button
        color={"secondary"}
        size="lg"
        onClick={submitHandler}
        className="font-medium	"
        isLoading={loading}
      >
        Sign Up
      </Button>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            color: "#ffffff",
            backgroundColor: "#02076e",
          },
        }}
      />
    </form>
  );
};

export default Signup;
