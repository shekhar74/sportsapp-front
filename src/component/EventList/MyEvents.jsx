import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {
  SimpleGrid,
  Box,
  Button,
  Center,useToast,Heading
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from "@chakra-ui/react";

function MyEvents() {
  const [data, setData] = useState([]);
  const [flag,setFlag]=useState(true)
let token=localStorage.getItem("auth-token")
const toast=useToast();
  useEffect(() => {
    axios
      .get("http://localhost:6500/event/organize",{
        headers:{
            "auth-token":token
        }
      })
      .then((res) => setData(res.data)).catch((e)=>{
        toast({
            title: `${e.code}`,
            description: `${e.response.data.msg}`,
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
      })
  },[flag]);

  const handleaccept=(re,e)=>{
    let eventid=e._id;
    let participant=re._id
    console.log(eventid,participant )
    // console.log("like",e._id)
    axios.put(`http://localhost:6500/event/${eventid}/requests/${participant}`,{"accepted":"true"},{headers:{
        "auth-token":token
    }}).then(res=>{
        setFlag(!flag)
         toast({
        title: "Accepted",
        description: `${res.data.msg}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })}).catch((e)=>{toast({
        title: `${e.code}`,
        description: `${e.response.data.msg}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      })})
}

const handlereject=(re,e)=>{
    let eventid=e._id;
    let participant=re._id
    console.log(eventid,participant )
    // console.log("like",e._id)
    axios.put(`http://localhost:6500/event/${eventid}/requests/${participant}`,{"accepted":"false"},{headers:{
        "auth-token":token
    }}).then((res)=> {
        setFlag(!flag)
        toast({
        title: "Rejected",
        description: `${res.data.msg}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })}).catch((e)=>{toast({
        title: `${e.code}`,
        description: `${e.response.data.msg}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      })})
}
  console.log(data, "data");

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Navbar />
      <Center><Heading>Event I Am Organizing</Heading></Center>
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
      <Center><Heading>Requests to join My Events</Heading></Center>
     {
        data&&data.map((e,i)=>{
            return( <div key={i+"b"}>
            <Center ><Heading color={"red.600"}>Event:= {e.name}</Heading></Center>
             <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Sl. No.</Th>
                      <Th>Username</Th>
                      <Th>Accept</Th>
                      <Th>Reject</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {e.requests &&
                      e.requests.map((re, ind) => {
                        return (
                          <Tr key={ind+"a"}>
                             <Td>{ind + 1}</Td>
                            <Td>{re.username}</Td>
                            <Td><Button colorScheme="green" onClick={()=>{handleaccept(re,e)}}>accept</Button></Td>
                            <Td><Button colorScheme="red" onClick={()=>{handlereject(re,e)}}>reject</Button></Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div> )
        })
     }
  
    </div>
  );
}

export default MyEvents;
