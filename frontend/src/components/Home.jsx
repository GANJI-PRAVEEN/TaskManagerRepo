import React from 'react'
import Navbar from './Navbar.jsx';
import {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import HeroSection from './HeroSection.jsx';
const Home = () => {
  const navigate = useNavigate();
  const [activeSidebarTab,setActiveSidebarTab] = useState("");
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const role = session?.role;
  useEffect(() => {
    if(!session){
      navigate('/login');
    }
  },[session,navigate]);
  if(!session)return null;
  return (
    <div>
      <Navbar setActiveSidebarTab={setActiveSidebarTab}/>
      <HeroSection activeSidebarTab={activeSidebarTab} setActiveSidebarTab={setActiveSidebarTab} />
    </div>
  )
}

export default Home
