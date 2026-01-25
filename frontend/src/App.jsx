import React from 'react';
import {Routes,Route} from "react-router-dom";
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import {ToastContainer} from "react-toastify";


function App(){
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )

}
export default App;