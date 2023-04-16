import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {
  SimpleGrid,
  Box
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'

function EventList() {
  const [data, setData] = useState([]);

  const Navigate= useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:6500/event/all")
      .then((res) => setData(res.data));
  }, []);
  console.log(data, "data");

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Navbar />
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
                onClick={()=>Navigate(`/event/${e._id}`,console.log(e._id))} 
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

export default EventList;
