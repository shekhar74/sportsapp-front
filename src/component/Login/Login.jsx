import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Center,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {
  const toast = useToast();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const handlechange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data)
  };
  const handlesubmit = (e) => {
    // console.log(data)
    e.preventDefault();
    axios
      .post("http://localhost:6500/user/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("auth-token", res.data.token);
          toast({
            title: `${res.data.msg}`,
            description: "Logged in Successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/eventlist");
        }
      })
      .catch((e) => {
        // console.log(e)
        toast({
          title: `${e.code}`,
          description: `${e.message}`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Center>
        <Heading size={"lg"}>Login</Heading>
      </Center>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          type="email"
          onChange={handlechange}
          placeholder="Enter Username"
        />
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          onChange={handlechange}
          placeholder="Enter Password"
        />

        <Center gap={5}>
          <Button colorScheme="green" type="submit" onClick={handlesubmit}>
            Login
          </Button>
          <Button colorScheme="blue" type="submit" onClick={()=>{navigate("/signup")}}>
            Signup Page
          </Button>
        </Center>
      </FormControl>
    </div>
  );
}

export default Login;
