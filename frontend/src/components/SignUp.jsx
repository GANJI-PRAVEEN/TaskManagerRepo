import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import ParticlesBackground from './ParticlesBackground';

const SignUp = () => {
  const [gender,setGender] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername] = useState("");
  const [name,setName]=useState();


  const navigate = useNavigate();
  const handleAlreadyRegistered=()=>{
    navigate('/login')
  }


  const handleRegisterButton=async(e)=>{
      e.preventDefault();
      //sending admin data to server
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/v1/taskManager/create-admin`,{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({
          adminMail:email,
          adminPassword:password,
          adminGender:gender,
          adminName:name,
        }),
      });
      
      const msg = await res.json();
      if(msg.success){
        sessionStorage.setItem(
          "loggedUser",
          JSON.stringify({
            user:msg.user,
            role:msg.role
          })
        )
        toast.success("successfully logged in");
        navigate('/');
      }
      else {
        toast.error(msg.message);
      }
      

  }



  return (
    <div className="w-full min-h-screen bg-black bg-cover">
      <ParticlesBackground/>
      <div className='p-10 flex items-center justify-center'>
        <div className='w-[300px] h-[500px] bg-white rounded-md flex flex-col items-center space-y-2 sm:w-[350px]'>
          <div className="mt-1 flex justify-center">
                  <span className="px-4 mt-2 text-xs font-bold uppercase
                   bg-red-100 text-red-700
                   border border-red-300
                   rounded-full shadow-sm">
                    Admin's Only
                  </span>
          </div>

          <div className='flex items-center flex-col space-y-2 py-2  '>
            <p className='text-2xl text-[#450920] font-extrabold sm:text-4xl'>SignUp</p>
            <hr className='w-[200px]'/>
         </div>
         <div className='w-full flex flex-col space-y-8'>
          <input type="text"  value = {name} placeholder='Name' className='border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black focus:outline-none hover:shadow-green-400' onChange={(e)=>setName(e.target.value)}/>
          <input type="email" value = {email} placeholder='email' className='border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black focus:outline-none hover:shadow-green-400' onChange={(e)=>setEmail(e.target.value)}/>

          <input type="password" value={password} placeholder='password' className='border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black focus:outline-none hover:shadow-green-400' onChange={(e)=>setPassword(e.target.value)}/>

          <select
          value={gender}
          onChange={(e)=> setGender(e.target.value)}
            className="border border-gray-300 shadow-sm rounded-4xl p-1.5 text-center mx-5 shadow-black
                    text-black
                      border border-gray-300
                      rounded-3xl
                      shadow-sm
                      p-2
                      focus:outline-none
                      focus:ring-2 focus:ring-green-100
                      cursor-pointer"
          >
            <option value="" className='text-gray-600'>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>         
        </div>
         <div className='flex flex-col items-center space-y-3'>
          <button className='border p-2 mt-10 rounded-lg w-[150px] bg-green-600 hover:bg-green-500 text-white font-bold sm:w-[200px] sm:text-lg cursor-pointer' onClick={(e)=>handleRegisterButton(e)}>Register</button>
          <p className='text-sm sm:text-lg '>Already Registered? click here to <span className='text-blue-800 underline font-bold cursor-pointer' onClick={handleAlreadyRegistered}>Login</span></p>
         </div>

        </div>

      </div>
    </div>
  )
}

export default SignUp
