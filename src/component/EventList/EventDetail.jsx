import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Badge,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

function EventDetail() {
  const toast = useToast();
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [flag, setFlag] = useState(false);
  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    // console.log(id);
    axios.get(`https://sportsapp-6dg0.onrender.com/event/${id}`).then((res) => {
      setdata(res.data);
    });
  }, [id]);
  const handlerequest = async() => {
    // console.log(id, token, "req");
    if (!token) {
      toast({
        title: `${"Login First"}`,
        description: "Login To Join.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    axios
      .post(`https://sportsapp-6dg0.onrender.com/event/${id}/join`,null,{
        headers: {
          'auth-token': token,
        }})
      .then((res) => {
        //  console.log(res);
        if (res.data.msg == "Request to join event sent") {
            setFlag(true)
          toast({
            title: `Request Sent`,
            description: `${res.data.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        // console.log(e);
        toast({
          title: `${e.code}`,
          description: `${e.response.data.msg}`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Navbar />
      <Center>
        {data &&
          data.map((e, i) => {
            return (
              <Box
                key={i + "details"}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src="https://img.freepik.com/free-vector/kids-learning-playing-illustration_53876-40285.jpg"
                  alt="activity"
                />
                <Badge borderRadius="full" ml={8} px="4" colorScheme="teal">
                  New
                </Badge>

                <Box p="6">
                  <Box
                    mt="1"
                    color="red.500"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                    textTransform="uppercase"
                  >
                    {e.name}
                  </Box>
                  <Box fontWeight="semibold" as="h4">
                    Organizer Name
                  </Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    {e.organizer.username}
                  </Box>

                  <Box fontWeight="semibold" as="h4">
                    Description
                  </Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    {e.description}
                  </Box>

                  <Box fontWeight="semibold" as="h4">
                    Requirements
                  </Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    {e.requirements}
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      Total Players {e.maxPlayers}
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="s"
                      textTransform="uppercase"
                      ml="2"
                    >
                      Date {e.date} &bull; Time {e.time}{" "}
                      hrs
                    </Box>
                  </Box>
                </Box>
                <Center>
                  <Button
                    disabled={flag}
                    onClick={handlerequest}
                    colorScheme="blue"
                    m={1}
                  >
                    {flag ? "Requested" : "Request to Join"}
                  </Button>
                </Center>
              </Box>
            );
          })}
      </Center>
    </div>
  );
}

export default EventDetail;
