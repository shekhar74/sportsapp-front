import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./component/Signup/Signup";
import Login from "./component/Login/Login";
import EventList from "./component/EventList/EventList";
import EventDetail from "./component/EventList/EventDetail";
import EventPlayers from "./component/EventList/EventPlayers";
import JoinedRequested from "./component/EventList/JoinedRequested";
import MyEvents from "./component/EventList/MyEvents";
import CreateEvent from "./component/EventList/CreateEvent";
import Error from "./component/Error/Error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/eventlist" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail/>}/>
      <Route path="/eventplayers/:id" element={<EventPlayers/>}/>
      <Route path="/eventjoin" element={<JoinedRequested/>}/>
      <Route path="/myevent" element={<MyEvents/>}/>
      <Route path="/create" element={<CreateEvent/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
  );
}

export default App;
