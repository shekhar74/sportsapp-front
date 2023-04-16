import React from "react";
import style from "./Navbar.module.css";
import { Button, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const toast = useToast();
  let navigate = useNavigate();
  function handlelogout() {
        localStorage.removeItem("auth-token");
        toast({
            title: `Logout Success`,
            description: "Logged out Successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        navigate("/");
  }
  return (
    <div className={style.Navbar}>
      <Button colorScheme="orange" onClick={() => navigate("/")}>
        Login
      </Button>
      <Button colorScheme="orange" onClick={() => navigate("/signup")}>
        Register
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/eventlist")}>
        All Event
      </Button>
      <Button colorScheme="green" onClick={() => navigate("/create")}>
        Create Event
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/eventjoin")}>
        Event Joined/Requested
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/myevent")}>
        My Events
      </Button>
      <Button colorScheme="red" onClick={handlelogout}>
        Logout
      </Button>
    </div>
  );
};
export default Navbar;
