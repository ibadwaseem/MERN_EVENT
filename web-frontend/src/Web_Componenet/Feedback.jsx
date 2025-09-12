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

export default function Feedback() {
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
  let[msg,setMsg]=useState("");

  function clear(){
    setName("");
    setEmail("");
    setMsg("");
}

async function save_feed(e) {
  e.preventDefault();

  // Basic validation
  if (!name.trim() || !email.trim() || !msg.trim()) {
    toast.error("Please fill in all fields before submitting.");
    return;
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  try {     
      await axios.post("http://localhost:4000/eproject/a_feed", {
          name: name,
          email: email,
          msg: msg
      });
      toast.success("Thanks For Your Feedback");
      clear();
  } catch (error) {
      toast.error("Failed to send feedback. Please try again later.");
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
    <section id="feedback" className="contact section bg-light py-5">

  <div className="container">
    {/* Section Title */}
    <div className="section-title text-center mb-5" data-aos="fade-up">
      <h2 className="fw-bold">We Value Your Feedback</h2>
      <p className="text-muted">Share your thoughts about our event management or anything else. We’re listening!</p>
    </div>

    <div className="row gy-4 justify-content-center">

      {/* Contact Info */}
      <div className="col-lg-4">
        <div className="d-flex flex-column gap-4">
          <div className="info-item text-center p-4 bg-white shadow rounded" data-aos="fade-up" data-aos-delay="100">
            <i className="bi bi-geo-alt fs-3 text-danger mb-2"></i>
            <h5>Address</h5>
            <p className="mb-0">///</p>
          </div>

          <div className="info-item text-center p-4 bg-white shadow rounded" data-aos="fade-up" data-aos-delay="200">
            <i className="bi bi-telephone fs-3 text-danger mb-2"></i>
            <h5>Call Us</h5>
            <p className="mb-0">+92 319 3276826</p>
          </div>

          <div className="info-item text-center p-4 bg-white shadow rounded" data-aos="fade-up" data-aos-delay="300">
            <i className="bi bi-envelope fs-3 text-danger mb-2"></i>
            <h5>Email Us</h5>
            <p className="mb-0">eventsphere.management@bussiness.com</p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="col-lg-6">
        <form className="p-4 bg-white shadow rounded" data-aos="fade-up" data-aos-delay="400">
          <div className="row gy-3">

            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Send us your feedback about our management or anything else..."
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>
            </div>

            <div className="col-md-12 text-center">
              <button
                type="submit"
                onClick={save_feed}
                className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm"
              >
                Send Feedback
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
