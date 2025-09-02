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

import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
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

  // shedule start
  const [schedule_data, setSchedule_data] = useState([]);

  useEffect(() => {
    get_data();
}, []);

async function get_data() {
    try {
        const response = await axios.get("http://localhost:3000/eproject/get_schedule");
        setSchedule_data(response.data);
    } catch (e) {
        console.error(e);
    }
}
  // shedule end

  // event start
  const [event_data, setEvent_data] = useState([]);

  useEffect(() => {
    get_data_event();
}, []);


  async function get_data_event() {
    try {
        const response = await axios.get("http://localhost:4000/eproject/get_events");
        setEvent_data(response.data);
    } catch (e) {
        console.error(e);
    }
}

  // event end
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
      {/* <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn mt-3"></a> */}
      <a href="./assets/img/eproject.mp4" className="glightbox pulsating-play-btn mt-3"></a>
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


<section id="speakers" className="speakers section">


  <div className="container section-title" data-aos="fade-up">
    <h2>Event Speakers<br/></h2>

  </div>
  <div className="container">

    <div className="row gy-4">

      <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div className="member">
          <img src="./assets/img/speakers/speaker-1.jpg" className="img-fluid" alt=""/>
          <div className="member-info">
            <div className="member-info-content">
              <h4><a href="speaker-details.html">Walter White</a></h4>
              <span>Quas alias incidunt</span>
            </div>
            <div className="social">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
        <div className="member">
          <img src="./assets/img/speakers/speaker-2.jpg" className="img-fluid" alt=""/>
          <div className="member-info">
            <div className="member-info-content">
              <h4><a href="speaker-details.html">Hubert Hirthe</a></h4>
              <span>Consequuntur odio aut</span>
            </div>
            <div className="social">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
        <div className="member">
          <img src="./assets/img/speakers/speaker-3.jpg" className="img-fluid" alt=""/>
          <div className="member-info">
            <div className="member-info-content">
              <h4><a href="speaker-details.html">Amanda Jepson</a></h4>
              <span>Fugiat laborum et</span>
            </div>
            <div className="social">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
        <div className="member">
          <img src="./assets/img/speakers/speaker-4.jpg" className="img-fluid" alt=""/>
          <div className="member-info">
            <div className="member-info-content">
              <h4><a href="speaker-details.html">William Anderson</a></h4>
              <span>Debitis iure vero</span>
            </div>
            <div className="social">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</section>


<section id="schedule" className="schedule section">


  <div className="container section-title" data-aos="fade-up">
    <h2>Event Schedule<br/></h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container">

    <ul className="nav nav-tabs" role="tablist" data-aos="fade-up" data-aos-delay="100">
      <li className="nav-item">
        <a className="nav-link active" href="#day-1" role="tab" data-bs-toggle="tab">Day 1</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#day-2" role="tab" data-bs-toggle="tab">Day 2</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#day-3" role="tab" data-bs-toggle="tab">Day 3</a>
      </li>
    </ul>

    <div className="tab-content row justify-content-center" data-aos="fade-up" data-aos-delay="200">

      <h3 className="sub-heading">Voluptatem nulla veniam soluta et corrupti consequatur neque eveniet officia. Eius necessitatibus voluptatem quis labore perspiciatis quia.</h3>

     
      <div role="tabpanel" className="col-lg-9 tab-pane fade show active" id="day-1">
  {schedule_data.map((a) => (
    <div className="row schedule-item py-4 mb-4 border rounded shadow-sm bg-light" key={a._id}>
      <div className="col-md-3 mb-3 mb-md-0">
        <p className="mb-1"><strong>Start Date:</strong></p>
        <p className="text-muted">{a.start_date}</p>
      </div>
      <div className="col-md-3 mb-3 mb-md-0">
        <p className="mb-1"><strong>End Date:</strong></p>
        <p className="text-muted">{a.end_date}</p>
      </div>
      <div className="col-md-6">
        <h5 className="mb-1"><strong>Speaker:</strong> {a.speaker}</h5>
        <h6 className="text-primary"><strong>Topic:</strong> {a.topic}</h6>
        <p className="mb-0"><strong>Location:</strong> <span className="text-muted">{a.location}</span></p>
      </div>
    </div>
  ))}
</div>


      <div role="tabpanel" className="col-lg-9  tab-pane fade" id="day-2">

        <div className="row schedule-item">
          <div className="col-md-2"><time>10:00 AM</time></div>
          <div className="col-md-10">
            <div className="speaker">
              <img src="./assets/img/speakers/speaker-1-2.jpg" alt="Brenden Legros"/>
            </div>
            <h4>Libero corrupti explicabo itaque. <span>Brenden Legros</span></h4>
            <p>Facere provident incidunt quos voluptas.</p>
          </div>
        </div>

      

      </div>


      <div role="tabpanel" className="col-lg-9  tab-pane fade" id="day-3">

        <div className="row schedule-item">
          <div className="col-md-2"><time>10:00 AM</time></div>
          <div className="col-md-10">
            <div className="speaker">
              <img src="./assets/img/speakers/speaker-2-2.jpg" alt="Hubert Hirthe"/>
            </div>
            <h4>Et voluptatem iusto dicta nobis. <span>Hubert Hirthe</span></h4>
            <p>Maiores dignissimos neque qui cum accusantium ut sit sint inventore.</p>
          </div>
        </div>

      

      </div>

    </div>

  </div>
</section>

<section id="venue" className="venue section">


  <div className="container section-title" data-aos="fade-up">
    <h2>Event Venue<br/></h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container-fluid" data-aos="fade-up">

    <div className="row g-0">
      <div className="col-lg-6 venue-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
      </div>

      <div className="col-lg-6 venue-info">
        <div className="row justify-content-center">
          <div className="col-11 col-lg-8 position-relative">
            <h3>Expo Center, Pakistan</h3>
            <p>Iste nobis eum sapiente sunt enim dolores labore accusantium autem. Cumque beatae ipsam. Est quae sit qui voluptatem corporis velit. Qui maxime accusamus possimus. Consequatur sequi et ea suscipit enim nesciunt quia velit.</p>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div className="container-fluid venue-gallery-container" data-aos="fade-up" data-aos-delay="100">
    <div className="row g-0">

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-1.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-1.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-2.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-2.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-3.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-3.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-4.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-4.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-5.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-5.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-6.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-6.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-7.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-7.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-md-4">
        <div className="venue-gallery">
          <a href="./assets/img/venue-gallery/venue-gallery-8.jpg" className="glightbox" data-gall="venue-gallery">
            <img src="./assets/img/venue-gallery/venue-gallery-8.jpg" alt="" className="img-fluid"/>
          </a>
        </div>
      </div>

    </div>
  </div>

</section>

<section id="hotels" className="hotels section">

  <div className="container section-title" data-aos="fade-up">
    <h2>Events</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container">

    <div className="row gy-4">

      {/* <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div className="card h-100">
          <div className="card-img">
            <img src="./assets/img/hotels-1.jpg" alt="" className="img-fluid"/>
          </div>
          <h3><a href="#" className="stretched-link">Non quibusdam blanditiis</a></h3>
          <div className="stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
          <p>0.4 Mile from the Venue</p>
        </div>
      </div> */}
      {event_data.map((a)=>(
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200" key={a._id}>
        <div className="card h-100">
          <div className="card-img">
            <img src="./assets/img/expo-img2.jpg" alt="" className="img-fluid"/>
          </div>
          <h2><a href="#" className="stretched-link">{a.title}</a></h2>
          <h3>{a.theme}</h3>
          {/* <div className="stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div> */}
          <p>{a.start_date}</p>
          <p>{a.end_date}</p>
          <p> {a.description}</p>
        </div>
      </div>
      ))}
      

      {/* <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
        <div className="card h-100">
          <div className="card-img">
            <img src="./assets/img/hotels-3.jpg" alt="" className="img-fluid"/>
          </div>
          <h3><a href="#" className="stretched-link">Dolores ut ut voluptatibu</a></h3>
          <div className="stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
          <p>0.6 Mile from the Venue</p>
        </div>
      </div> */}

    </div>

  </div>

</section>

<section id="sponsors" className="sponsors section light-background">


  <div className="container section-title" data-aos="fade-up">
    <h2>Sponsors</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container" data-aos="fade-up" data-aos-delay="100">

    <div className="row g-0 clients-wrap">

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-1.png" className="img-fluid" alt=""/>
      </div>

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-2.png" className="img-fluid" alt=""/>
      </div>

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-3.png" className="img-fluid" alt=""/>
      </div>

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-4.png" className="img-fluid" alt=""/>
      </div>

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-5.png" className="img-fluid" alt=""/>
      </div>
      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-6.png" className="img-fluid" alt=""/>
      </div>
      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-7.png" className="img-fluid" alt=""/>
      </div>

      <div className="col-xl-3 col-md-4 client-logo">
        <img src="./assets/img/clients/client-8.png" className="img-fluid" alt=""/>
      </div>
    </div>

  </div>

</section>

{/* <section id="faq" className="faq section">


  <div className="container section-title" data-aos="fade-up">
    <h2>Frequently Asked Questions</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container">

    <div className="row justify-content-center">

      <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">

        <div className="faq-container">

          <div className="faq-item faq-active">
            <h3>Non consectetur a erat nam at lectus urna duis?</h3>
            <div className="faq-content">
              <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

          <div className="faq-item">
            <h3>Feugiat scelerisque varius morbi enim nunc faucibus?</h3>
            <div className="faq-content">
              <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

          <div className="faq-item">
            <h3>Dolor sit amet consectetur adipiscing elit pellentesque?</h3>
            <div className="faq-content">
              <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

          <div className="faq-item">
            <h3>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h3>
            <div className="faq-content">
              <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

          <div className="faq-item">
            <h3>Tempus quam pellentesque nec nam aliquam sem et tortor?</h3>
            <div className="faq-content">
              <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

          <div className="faq-item">
            <h3>Perspiciatis quod quo quos nulla quo illum ullam?</h3>
            <div className="faq-content">
              <p>Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right"></i>
          </div>

        </div>

      </div>
    </div>

  </div>

</section> */}

{/* <section id="contact" className="section">

  <div className="container section-title" data-aos="fade-up">
    <h2>Contact</h2>
    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
  </div>

  <div className="container" data-aos="fade-up" data-aos-delay="100">

    <div className="row gy-4">

      <div className="col-lg-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
          <i className="bi bi-geo-alt"></i>
          <h3>Address</h3>
          <p>A108 Adam Street, New York, NY 535022</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
          <i className="bi bi-telephone"></i>
          <h3>Call Us</h3>
          <p>+1 5589 55488 55</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
          <i className="bi bi-envelope"></i>
          <h3>Email Us</h3>
          <p>info@example.com</p>
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

</section> */}
<ToastContainer/>
</main>
<Footer/>
   </div>
  )
}
