import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import Navbar from './Navbar';
export default function Forget_as_exb() {
  let [email,setEmail]=useState("")

  async function fp(){
      try {
          await axios.post(`http://localhost:4000/eproject/exb_forgot`,{
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
                  <h2>About EventSphere</h2>
                  <p>
                    EventSphere 2025 brings together industry leaders, innovators, and enthusiasts for a day of
                    inspiration, collaboration, and growth. Through keynote talks, interactive workshops, and
                    networking opportunities, attendees will discover new ideas, gain practical insights, and
                    connect with like-minded professionals. Whether you’re here to learn, share, or be inspired,
                    this event is designed to create lasting impact.
                  </p>

                </div>
                <div className="col-lg-3">
                  <h3>Where</h3>
                  <p>Expo Center, Pakistan</p>
                </div>
                <div className="col-lg-3">
                  <h3>When</h3>
                  <p>Monday to Wednesday<br />10-12 September</p>
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
