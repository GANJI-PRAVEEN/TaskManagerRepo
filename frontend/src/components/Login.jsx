import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loggedUser,setLoggedUser]=useState("");
  const [who,setWho] = useState("guest");
  const navigate = useNavigate();
  const handleLoginSubmit=async(e)=>{
    console.log(email,password);
    e.preventDefault();
    //sending data to server
    const res = await fetch("http://localhost:4000/api/v1/taskManager/user-login",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        email,
        password,
      })
    });
    const data = await res.json();
    if(!data.success){
      console.log(data);
      toast.error("user not exist");
      return;
    }
    toast.success(`successfully logged in as a ${data.role}`)
    sessionStorage.setItem(
      "loggedUser",
      JSON.stringify({
        user: data.user,
        role: data.role
      })
    )
    navigate('/');
  }
  const handleNewRegister=(e)=>{
    //admin signup
    navigate('/signup');
  }
 return (
    <div className="w-full min-h-screen background-gradient bg-cover">
      <div className='p-10 flex items-center justify-center'>
        <div className='w-[300px] h-[370px] bg-white rounded-md flex flex-col items-center space-y-6 sm:w-[350px]'>
          <div className='flex items-center flex-col space-y-2 py-2  '>
            <p className='text-2xl text-[#450920] font-extrabold sm:text-4xl'>Login</p>
            <hr className='w-[200px]'/>
         </div>
         <div className='w-full flex flex-col justify-items-center space-y-8'>
          <input type="email" value={email} placeholder='email' className='border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black focus:outline-none hover:shadow-green-400' onChange={(e)=>{setEmail(e.target.value)}}/>
  
          <input type="password" value={password} placeholder='password' className='border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black focus:outline-none hover:shadow-green-400' onChange={(e)=>{setPassword(e.target.value)}}/>
         </div>
         <div className='flex flex-col items-center space-y-3'>
          <button className='border p-2 mt-10 rounded-lg w-[150px] bg-blue-800 hover:bg-blue-700 text-white font-bold sm:w-[200px] sm:text-lg cursor-pointer' onClick={(e)=>{handleLoginSubmit(e)}}>Login</button>
          <p className='text-sm sm:text-lg '>Not registered yet..? <span className='text-blue-800 underline font-bold cursor-pointer' onClick={(e)=>{handleNewRegister(e)}}>Register</span></p>
         </div>

        </div>

      </div>
    </div>
  )
}

export default Login
