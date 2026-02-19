import React, { useState } from 'react'
import assets from "../assets/assets.js";
import {useNavigate} from "react-router-dom"

const Navbar = ({ setActiveSidebarTab}) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const userRole = session?.role;
  const user = session?.user;
  const [menuOpen,setMenuOpen]=useState(false);
  const navigate = useNavigate();

  // menu login clicked navigate to /login
  const handleLoginPageNavigate =()=>{
    navigate('/login');
  }

  const handleAboutUsPageNavigate=()=>{

  }
  const handleRedirectToHome=()=>{
    setActiveSidebarTab("");
  }
  const handleLogoutUser=() => {
    sessionStorage.removeItem("loggedUser");
    navigate('/signup')
  }


  return (
    <div className='w-full top-0 fixed  min-h-[50px] bg-[#dad7cd] z-50'>
      <div className='flex items-center justify-between shadow-md shadow-gray-400 px-2'>
        <div className='flex items-center p-1 space-x-2'>
          <img src={assets.Logo} alt="Logo" className='w-12 h-12 rounded-lg cursor-pointer' onClick={handleRedirectToHome}/>
          <p className='text-2xl text-[#0d1b2a] font-bold cursor-pointer' onClick={handleRedirectToHome}>DoItNow</p>
          <p className=' border p-1 rounded-lg text-sm bg-[#ffafcc] font-bold border-red-400 shadow shadow-md '>{userRole}</p>
        </div>
        <div className=' hidden md:block md:flex md:gap-4 md:items-center md:p-2 md:text-xl md:text-[#0d1b2a]'>
            <p className='hover:font-semibold cursor-pointer transition duration-200'>AboutUs</p>
            <p className={`${!session? 'block':'hidden'} hover:font-semibold cursor-pointer transition duration-200`} onClick={handleLoginPageNavigate}>Login</p>
            <p className={`${session? 'block':'hidden'} hover:font-semibold cursor-pointer transition duration-200`} onClick={handleLogoutUser}>Logout</p>
            

            
        </div>
        <div className='md:hidden lg:hidden'>
          {menuOpen?(
            <span className="material-symbols-outlined cursor-pointer" onClick={()=>{setMenuOpen(false)}}>close</span>
        ):(
          <span className="material-symbols-outlined cursor-pointer" onClick={()=>{setMenuOpen(true)}}>menu</span>
        )}
        </div>
   
      
      </div>

      {menuOpen && (
        <div className='w-full sm:hidden h-[100px] absolute z-1  bg-blue-600/90 shadow-md shadow-gray-600 transition-all duration-300 ease-in-out'>
          <div className='flex flex-col items-center gap-2 my-3 block'>
                <p className='cursor-pointer  font-bold text-white text-lg hover:underline' onClick={handleAboutUsPageNavigate}>AboutUs</p>
                <div className='w-full border border-black/40'></div>
                <p className=' cursor-pointer font-bold text-white text-lg hover:underline' onClick={handleLoginPageNavigate}>Login</p>         
          </div>
      </div>
      )}
      
    </div>
  )
}

export default Navbar
