import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Textarea,
  Center,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function CreateEvent() {
  const toast = useToast();
  let token = localStorage.getItem("auth-token");
  const [data, setData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    maxPlayers: 0,
    requirements: "",
  });
  let navigate = useNavigate();
  const handlechange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data)
  };
  const handlesubmit = (e) => {
    if (!token) {
      toast({
        title: "Login First.",
        description: "Login to Create Event.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
    // console.log(data);
    e.preventDefault();
    axios.post("https://sportsapp-6dg0.onrender.com/event/create",{
         name:data.name,
    description:data.description,
    date:data.date,
    time:data.time,
    maxPlayers:data.maxPlayers,
    requirements:data.requirements,
    },{
        headers:{
            "auth-token":token
        }
    })
     .then((res)=>{
        // console.log(res)
        if(res.data)
       {
        sessionStorage.setItem("token", res.data.token)
        toast({
            title: "Event Created.",
            description: "Event Created Successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
     }
    }).catch((e)=>{
        toast({
            title: `${e.code}`,
            description: `${e.response.message}`,
            status: "warning",
            duration: 2000,
            isClosable: true,
          })

    })
  };
  return (
    <div style={{ margin: "auto" }}>
      <Navbar />
      <Center>
        <Heading size={"lg"}>Create Event</Heading>
      </Center>
      <FormControl isRequired style={{ width: "50%", margin: "auto" }}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          type="string"
          onChange={handlechange}
          placeholder="Enter Name of event"
        />
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          type="string"
          onChange={handlechange}
          placeholder="Enter Description of Event"
        />
        <FormLabel>Date of Event</FormLabel>
        <Input
          name="date"
          type="date"
          onChange={handlechange}
          placeholder="Enter Date of Event"
        />
        <FormLabel>Time of Event</FormLabel>
        <Input
          type="time"
          name="time"
          onChange={handlechange}
          placeholder="Enter Time of Event"
        />
        <FormLabel>Number of Participants</FormLabel>
        <Input
          type="number"
          name="maxPlayers"
          onChange={handlechange}
          placeholder="Enter Number of Participants"
        />
        <FormLabel>Requirements</FormLabel>
        <Textarea
          name="requirements"
          type="string"
          onChange={handlechange}
          placeholder="Enter Requirements of Event"
        />
        <Center>
          <Button type="submit" colorScheme="blue" onClick={handlesubmit}>
            Submit
          </Button>
        </Center>
      </FormControl>
    </div>
  );
}

export default CreateEvent;
