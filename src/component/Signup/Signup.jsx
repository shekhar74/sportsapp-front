import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Signup() {
  const toast = useToast();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handlechange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlesubmit = (e) => {
    // console.log(data)
    e.preventDefault();
    axios
      .post("http://localhost:6500/user/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          toast({
            title: `${res.data.msg}`,
            description: "We've created your Account.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }
      })
      .catch((e) => {
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
      <h1 style={{ width: "50%", margin: "auto", textAlign: "center" }}>
        Signup
      </h1>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          type="string"
          onChange={handlechange}
          placeholder="Enter Username"
        />
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          onChange={handlechange}
          placeholder="Enter Email"
        />
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          onChange={handlechange}
          placeholder="Enter Password"
        />

        <Button type="submit" onClick={handlesubmit}>
          Signup
        </Button>
      </FormControl>
    </div>
  );
}

export default Signup;
