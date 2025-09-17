
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';
import GLightbox from 'glightbox';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';

import axios from 'axios';
import React, {useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

import Navbar from './Navbar';
import Footer from './Footer';
export default function Login_exb() {
       useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    GLightbox({ selector: '.glightbox' });
  }, []);

  const swiperConfig = {
    modules: [Autoplay, Pagination],
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  const images = Array.from({ length: 8 }, (_, i) => ({
    src: `/./assets/img/event-gallery/event-gallery-${i + 1}.jpg`,
    alt: `event-gallery-${i + 1}`,
  }));

  let [email,setEmail] = useState("")
      let [pass,setPass] = useState("")
      const [showPassword, setShowPassword] = useState(false);
      let nav=useNavigate();
  
      async function login_work(e){
          try {
            e.preventDefault();
              await axios.post("http://localhost:4000/eproject/exb_log",{
                  email :email,
                  password:pass
              }).then((a)=>{
                  toast.success(a.data.msg);
                  localStorage.setItem("exhibitor_data",JSON.stringify(a.data.user))
                  setEmail("")
                  setPass("")
                  nav("/book_panel")
              })
          } catch (error) {
              toast.error(error.response.data.msg)
          }
      }

  return (
     <div>
      <Navbar/>
       <main className="main">
        
        
        <section id="hero" className="hero section dark-background">
    
          <img src="./assets/img/hero-bg.jpg" alt="" data-aos="fade-in" className=""/>
    
          <div className="container d-flex flex-column align-items-center text-center mt-auto">
            <h2 data-aos="fade-up" data-aos-delay="100" className="">The Event<br/><span>SphereManagement</span> System</h2>
            <p data-aos="fade-up" data-aos-delay="200">Expo Center, Pakistan</p>
            <div data-aos="fade-up" data-aos-delay="300" className="">
              <a href="./assets/img/eproject.mp4" className="glightbox pulsating-play-btn mt-3"></a>
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
        <section id="exhibitor-login" className="section bg-light py-5">

  <div className="container">
    {/* Section Title */}
    <div className="section-title text-center mb-5" data-aos="fade-up">
      <h2 className="fw-bold">Login as Exhibitor</h2>
      <p className="text-muted">Access your exhibitor dashboard by logging in below with your credentials.</p>
    </div>

    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow border-0 p-4" data-aos="fade-up" data-aos-delay="200">
          <form className="php-email-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 position-relative">
  <label htmlFor="password" className="form-label">Password</label>
  <input
    type={showPassword ? "text" : "password"}
    className="form-control"
    id="password"
    placeholder="Enter your password"
    required
    value={pass}
    onChange={(e) => setPass(e.target.value)}
  />
  <span 
    onClick={() => setShowPassword(!showPassword)} 
    className="position-absolute top-50 end-0 pe-3"
    style={{ cursor: 'pointer' }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

            <div className="d-grid mb-3">
              <button type="button" onClick={login_work} className="btn btn-danger rounded-pill py-2">
                Login
              </button>
            </div>

           <div className="text-center d-grid gap-2 mt-3">
  <Link 
    to="/reg_exb" 
    className="btn btn-outline-primary rounded-pill w-75 mx-auto"
  >
    Register Now as Exhibitor
  </Link>
  <Link 
    to="/exb_forget" 
    className="btn btn-outline-secondary rounded-pill w-50 mx-auto"
  >
    Forgot Password?
  </Link>
</div>


          </form>
        </div>
      </div>
    </div>

  </div>
</section>

    <ToastContainer/>
      </main>
      <Footer/>
     </div>
  )
}
