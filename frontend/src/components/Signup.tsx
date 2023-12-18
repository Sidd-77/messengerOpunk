import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        isRequired
      />

      <Input
        key={0}
        type="username"
        label="Username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        labelPlacement={"inside"}
        className="flex"
        isRequired
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
        isRequired
      />

      <Button color={"secondary"} size="lg" className="font-medium	">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
