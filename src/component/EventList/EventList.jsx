import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function EventList() {
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:6500/event/all").then(res=>setData(res.data))
    },[])
    return ( <div>
        <Navbar/>
    </div> );
}

export default EventList;