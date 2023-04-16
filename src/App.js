import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/Signup/Signup";
import Login from "./component/Login/Login";
import EventList from "./component/EventList/EventList";
import EventDetail from "./component/EventList/EventDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/eventlist" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail/>}/>
    </Routes>
  );
}

export default App;
