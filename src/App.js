import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './component/Signup/Signup';
import Login from './component/Login/Login';
import EventList from './component/EventList/EventList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/eventlist' element={<EventList/>}/>
    </Routes>
  );
}

export default App;
