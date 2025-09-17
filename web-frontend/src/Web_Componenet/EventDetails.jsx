
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { useParams } from "react-router-dom";

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

export default function EventDetails() {
    useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    GLightbox({ selector: '.glightbox' });
  }, []);

  const { id } = useParams(); // get id from URL
   const [event, setEvent] = useState(null);

     useEffect(() => {
    get_event_details();
  }, []);

  async function get_event_details() {
    try {
      const res = await axios.get(`http://localhost:4000/eproject/get_event/${id}`);
      setEvent(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error fetching event:", err);
    }
  }

  if (!event) {
    return <div className="text-center mt-5">Loading...</div>;
  }


 

 

  







  return (
    <div>
      <Navbar/>
       <main className="main">
    
    
    <section id="hero" className="hero section dark-background">

      <img src="/assets/img/hero-bg.jpg" alt="" data-aos="fade-in" className=""/>

      <div className="container d-flex flex-column align-items-center text-center mt-auto">
        <h2 data-aos="fade-up" data-aos-delay="100" className="">The Event<br/><span>SphereManagement</span> System</h2>
        <p data-aos="fade-up" data-aos-delay="200">Expo Center, Pakistan</p>
        <div data-aos="fade-up" data-aos-delay="300" className="">
          <a href="/assets/img/eproject.mp4" className="glightbox pulsating-play-btn mt-3"></a>
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
        <div className="card shadow-lg p-4">
  <div className="row">
    {/* Left Column - Image */}
     <div className="col-md-6">
       <img
         src="/assets/img/expo-img2.jpg"
        alt={event.title}
         className="img-fluid rounded"
      />
     </div>

     {/* Right Column - Details */}
    <div className="col-md-6 d-flex flex-column justify-content-center">
       <h1 className="mb-3">{event[0].title}</h1>
       <h3 className="text-muted">{event[0].theme}</h3>
      <p>
         <strong>Start Date:</strong> {event[0].start_date}
      </p>
       <p>
        <strong>End Date:</strong> {event[0].end_date}
      </p>
       <p>
         <strong>Description:</strong> {event[0].description}
       </p>
     </div>
   </div>
 </div>

    <ToastContainer/>
  </main>
  <Footer/>
    </div>
      
  );

}













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import AOS from 'aos';
// import GLightbox from 'glightbox';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'aos/dist/aos.css';
// import 'glightbox/dist/css/glightbox.css';

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// import "bootstrap-icons/font/bootstrap-icons.css"
// import "react-toastify/dist/ReactToastify.css";



// export default function EventDetails() {

 
//   useEffect(() => {
//     AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
//     GLightbox({ selector: '.glightbox' });
//   }, []);



//   const { id } = useParams(); // get id from URL
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     get_event_details();
//   }, [id]);

//   async function get_event_details() {
//     try {
//       const res = await axios.get(`http://localhost:4000/eproject/get_event/${id}`);
//       setEvent(res.data);
//       console.log(res.data)
//     } catch (err) {
//       console.error("Error fetching event:", err);
//     }
//   }

//   if (!event) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   return (
//     <div>
//       <Navbar />

//       <main className="main">
    
    
//     <section id="hero" className="hero section dark-background">

//       <img src="./assets/img/hero-bg.jpg" alt="" data-aos="fade-in" className=""/>

//       <div className="container d-flex flex-column align-items-center text-center mt-auto">
//             <h2 data-aos="fade-up" data-aos-delay="100" className="">The Event<br /><span>SphereManagement</span> System</h2>
//             <p data-aos="fade-up" data-aos-delay="200">Expo Center, Pakistan</p>
//             <div data-aos="fade-up" data-aos-delay="300" className="">
//              {/* <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn mt-3"></a> */}
//       <a href="./assets/img/eproject.mp4" className="glightbox pulsating-play-btn mt-3"></a>
//             </div>
//           </div>

//       <div className="about-info mt-auto position-relative">

//         <div className="container position-relative" data-aos="fade-up">
//           <div className="row">
//             <div className="col-lg-6">
//               <h2>About The Event</h2>
//               <p>
//   EventSphere 2025 brings together industry leaders, innovators, and enthusiasts for a day of 
//   inspiration, collaboration, and growth. Through keynote talks, interactive workshops, and 
//   networking opportunities, attendees will discover new ideas, gain practical insights, and 
//   connect with like-minded professionals. Whether you’re here to learn, share, or be inspired, 
//   this event is designed to create lasting impact.
// </p>
//             </div>
//             <div className="col-lg-3">
//               <h3>Where</h3>
//               <p>Expo Center, Pakistan</p>
//             </div>
//             <div className="col-lg-3">
//               <h3>When</h3>
//               <p>Monday to Wednesday<br/>10-12 December</p>
//             </div>
//           </div>
//         </div>
//       </div>

//     </section>

      
//     <div className="card shadow-lg p-4">
//   <div className="row">
//     {/* Left Column - Image */}
//     <div className="col-md-6">
//       <img
//         src="./assets/img/expo_img3.jpg"
//         alt={event.title}
//         className="img-fluid rounded"
//       />
//     </div>

//     {/* Right Column - Details */}
//     <div className="col-md-6 d-flex flex-column justify-content-center">
//       <h1 className="mb-3">{event[0].title}</h1>
//       <h3 className="text-muted">{event[0].theme}</h3>
//       <p>
//         <strong>Start Date:</strong> {event[0].start_date}
//       </p>
//       <p>
//         <strong>End Date:</strong> {event[0].end_date}
//       </p>
//       <p>
//         <strong>Description:</strong> {event[0].description}
//       </p>
//     </div>
//   </div>
// </div>
// <ToastContainer/>
//       </main>
//       <Footer />
//     </div>
//   );
// }
