import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';

export default function A_Resetpass() {
    let [pswd,setPswd]=useState("")
    let [cpswd,setCpswd]=useState("")
    let {token}=useParams();
let nav = useNavigate();
    async function arp(){
        try {
            await axios.post(`http://localhost:4000/eproject/resetpswd/${token}`,{password:pswd}).
            then((A)=>{
                toast.success(A.data.msg)
                nav("/login")
            })
        } catch (error) {
            toast.error(error.response.data.msg)
            
        }
    }
  return (
    <div>
        {/* <Navbar/> */}
    <div className='container'>
    {/* <h2>Reset Password</h2> */}
    <p>Enter Your Password!</p>
    <input type="password" placeholder='Enter Password ' className='form-control my-2' value={pswd}
    onChange={(e)=>setPswd(e.target.value)}/>
    <p>Enter Your Password! </p>
    <input type="password" placeholder='Confirm Password ' className='form-control my-2' value={cpswd}
    onChange={(e)=>setCpswd(e.target.value)}/>

    <button className='btn btn-primary my-2' onClick={arp}>Sent Link</button>
    <ToastContainer/>
</div>
{/* <Footer/> */}
    </div>
  )
}
