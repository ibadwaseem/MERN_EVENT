import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import Navbar from './Navbar';


export default function A_forget() {
    let [email,setEmail]=useState("")

    async function fp(){
        try {
            await axios.post(`http://localhost:4000/eproject/a_forgot`,{
                email:email
            }).then((a)=>{
                toast.success(a.data.msg)
            })
            
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div>
    <Navbar/>
    <div className='container'>
    <h2>Forget Password</h2>
    <input type="email" placeholder='Enter Email ' className='form-control my-2' value={email}
    onChange={(e)=>setEmail(e.target.value)}/>

    <button className='btn btn-primary my-2' onClick={fp}>Sent Link</button>
    <ToastContainer/>
</div>
<Footer/>
</div>
  )
}

