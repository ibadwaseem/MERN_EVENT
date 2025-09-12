import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';
import GLightbox from 'glightbox';

import 'swiper/css';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';

import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactUs() {
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

  let[name,setName]=useState("");
    let[email,setEmail]=useState("");
    let[sub,setSub]=useState("");
    let[msg,setMsg]=useState("");

    function clear(){
      setName("");
      setEmail("");
      setSub("");
      setMsg("");
  }

  async function save_contact(e) {
    e.preventDefault();
  
    // Basic validation: check if any field is empty (trim to ignore spaces)
    if (!name.trim() || !email.trim() || !sub.trim() || !msg.trim()) {
      toast.error("Please fill in all fields before submitting.");
      return; // stop form submission
    }
  
    // Email format validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    try {
      await axios.post("http://localhost:4000/eproject/a_cont", {
        name: name,
        email: email,
        subject: sub,
        msg: msg
      });
      toast.success("Thank You For Contacting Us");
      clear();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
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
<h2>About The Event</h2>
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
              <p>Monday to Wednesday<br/>10-12 December</p>
            </div>
          </div>
        </div>
      </div>

    </section>

    <section id="contact" className="section">

  <div className="container section-title" data-aos="fade-up">
    <h2>Contact</h2>
<p>
  Have questions about the event? Get in touch with us — we’re here to help with 
  registrations, sponsorship opportunities, and general inquiries.
</p>
  </div>

  <div className="container" data-aos="fade-up" data-aos-delay="100">

    <div className="row gy-4">

      <div className="col-lg-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
          <i className="bi bi-geo-alt"></i>
          <h3>Address</h3>
          <p>///</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
          <i className="bi bi-telephone"></i>
          <h3>Call Us</h3>
          <p>+92 319 3276826</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
          <i className="bi bi-envelope"></i>
          <h3>Email Us</h3>
          <p>eventsphere.management@bussiness.com </p>
        </div>
      </div>

    </div>

    <div className="row gy-4 mt-1">
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameborder="0" style={{border:0, width: `100%`, height: `400px`}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="col-lg-6">
        <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="400">
          <div className="row gy-4">

            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Your Name" required="" value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>

            <div className="col-md-6 ">
              <input type="email" className="form-control" name="email" placeholder="Your Email" required="" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="col-md-12">
              <input type="text" className="form-control" name="subject" placeholder="Subject" required="" value={sub} onChange={(e)=> setSub(e.target.value)}/>
            </div>

            <div className="col-md-12">
              <textarea className="form-control" name="message" rows="6" placeholder="Message" required=""  value={msg} onChange={(e)=> setMsg(e.target.value)}></textarea>
            </div>

            <div className="col-md-12 text-center">
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">Your message has been sent. Thank you!</div>

              <button onClick={save_contact} type="submit" className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm">
  Submit
</button>

            </div>

          </div>
        </form>
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
