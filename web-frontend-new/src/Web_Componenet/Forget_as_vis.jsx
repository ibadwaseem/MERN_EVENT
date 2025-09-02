import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import Navbar from './Navbar';
export default function Forget_as_vis() {
  let [email,setEmail]=useState("")

  async function fp(){
      try {
          await axios.post(`http://localhost:4000/eproject/vis_forgot`,{
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
    <section id="hero" className="hero section dark-background">

<img src="./assets/img/hero-bg.jpg" alt="" data-aos="fade-in" className=""/>

<div className="container d-flex flex-column align-items-center text-center mt-auto">
  <h2 data-aos="fade-up" data-aos-delay="100" className="">THE ANNUAL<br/><span>MARKETING</span> CONFERENCE</h2>
  <p data-aos="fade-up" data-aos-delay="200">10-12 December, Downtown Conference Center, New York</p>
  <div data-aos="fade-up" data-aos-delay="300" className="">
    <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn mt-3"></a>
  </div>
</div>

<div className="about-info mt-auto position-relative">

  <div className="container position-relative" data-aos="fade-up">
    <div className="row">
      <div className="col-lg-6">
        <h2>About The Event</h2>
        <p>Sed nam ut dolor qui repellendus iusto odit. Possimus inventore eveniet accusamus error amet eius aut
          accusantium et. Non odit consequatur repudiandae sequi ea odio molestiae. Enim possimus sunt inventore in
          est ut optio sequi unde.</p>
      </div>
      <div className="col-lg-3">
        <h3>Where</h3>
        <p>Downtown Conference Center, New York</p>
      </div>
      <div className="col-lg-3">
        <h3>When</h3>
        <p>Monday to Wednesday<br/>10-12 December</p>
      </div>
    </div>
  </div>
</div>

</section>
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
