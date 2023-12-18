import {
  Button,
  Input,
} from "@nextui-org/react";

import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setGuestUser = () => {
    setEmail("t1@gmail.com");
    setPassword("t1");
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

      <Button color="primary" size="lg" className="font-medium">
        Login
      </Button>
      <Button color="success" className=" text-white font-medium" size="lg" onClick={setGuestUser}>
        Guest User
      </Button>
    </form>
  );
};
export default Login;
