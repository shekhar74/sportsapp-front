import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { Center,Heading} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spinner,useToast
  } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
function EventPlayers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let token = localStorage.getItem("auth-token");
  const toast = useToast();
  useEffect(() => {
    console.log(id,token,"token")
    axios.get(`http://localhost:6500/event/${id}/players`,{
        headers: {
          'auth-token': token,
        }}).then((res) => setData(res.data)).catch((e)=>toast({
            title:  `${e.code}`,
            description:  `${e.response.data.msg}`,
            status: "warning",
            duration: 2000,
            isClosable: true,
          }))
    setLoading(false);
  }, []);



if (loading) {
  return (
    <div>
      <Center>
        <Heading size="lg">Loading Data From Render Server...</Heading>
        {console.log("spinning")}
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </div>
  );
}


  return (
    <>
    <Navbar/>
    <div style={{width:"80%",margin:"auto"}} >
        <Center><Heading size="lg">Player List</Heading></Center>
        <TableContainer>
      <Table variant="striped"  colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Sl. No.</Th>
            <Th>Players</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((e, i) => {
              return (
                <Tr key={i}>
                   <Td>{i + 1}</Td>
                  <Td>{e.username}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
   
    </div>
    </>
  )
}

export default EventPlayers;
