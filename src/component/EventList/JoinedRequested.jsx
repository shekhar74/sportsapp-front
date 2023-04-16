import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {
  SimpleGrid,
  Box,
  Heading,
  Center,useToast
} from "@chakra-ui/react";

function JoinedRequested() {
  const [data, setData] = useState([]);
let token=localStorage.getItem("auth-token")
const toast = useToast();


  useEffect(() => {
    if(!token)
  {  toast({
        title: `${"Login First"}`,
        description: "Login To View Event List.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })}
    axios
      .get("http://localhost:6500/event/eventcheck",{
        headers:{
            "auth-token":token
        }
      })
      .then((res) => setData(res.data));
  }, []);
  console.log(data, "data");

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Navbar />
      <Center><Heading>List of Event Joined OR Requested To Join</Heading></Center>
      <SimpleGrid column={[1, 2, 3]}>
        {data &&
          data.map((e, i) => {
            return (
              <Box
              key={i+"eventlist"}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
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
                      Date {e.date.split("T").reverse()[1]}
                    </Box>
                  </Box>
                </Box>

              </Box>
            );
          })}
      </SimpleGrid>
    </div>
  );
}

export default JoinedRequested;
