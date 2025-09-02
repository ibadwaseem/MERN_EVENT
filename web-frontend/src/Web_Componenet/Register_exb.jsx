import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';
import GLightbox from 'glightbox';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';
import { Link } from 'react-router-dom';


import { toast ,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import Navbar from './Navbar';
import Footer from './Footer';
export default function Register_exb() {
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

   let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [pass,setPass] = useState("")
  let [age,setAge]= useState(0)
  let [phone,setPhone]= useState("")
  const [showPassword, setShowPassword] = useState(false);


  function clear(){
      setName("") 
      setEmail("")
      setPass("")
      setAge(0)
      setPhone("")

  }
 async function save_form(e){
      try {
        e.preventDefault();
          let pswd_regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          let username_regex=/^[A-Za-z0-9_-]{3,15}$/
          let p_re=/^(?:\+?\d{1,3})?[03]\d{9}$/
          if(!name || !email || !pass || age ===0){
              toast.error("All field are required")
          }
          else if(!pswd_regex.test(pass)){
              toast.error("password invalid")
          }
          else if(!username_regex.test(name)){
              toast.error("username invalid")
          }else if(!p_re.test(phone)) {
                  toast.error("Phone no Invalid")
                
          }else if(age < 18){
              toast.error("age greater then 18")
          }
          else{
              await  axios.post("http://localhost:4000/eproject/exb_reg",{
                  name:name,
                  email:email,
                  password:pass,
                  age:age,
                  phone:phone
              })
              console.log("data save succesfully")
              toast.success("data enter successfully")
              clear()

          }
    
      } catch (error) {
          if(error.status ===409){
              toast.error('email already exist')
          }
          toast.error(error)
          console.log(error)
          
      }

  }


  return (
    <div>
      <Navbar/>
       <main className="main">
        
        
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
        <section id="contact" className="contact section bg-light py-5">
  <div className="container">
    {/* Section Title */}
    <div className="section-title text-center mb-5" data-aos="fade-up">
      <h2 className="fw-bold text-dark">Register As Exhibitor</h2>
      <p className="text-muted">Join us as an exhibitor and showcase your innovations at the event.</p>
    </div>

    <div className="row justify-content-center">
      <div className="col-lg-8">
        <form onSubmit={save_form} className="bg-white p-4 rounded shadow-sm" data-aos="fade-up" data-aos-delay="200">
          <div className="row g-3">

            {/* Name */}
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

            {/* Email */}
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

            {/* Phone */}
            <div className="col-md-6">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Your Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Age */}
            <div className="col-md-6">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                placeholder="Your Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="col-md-12 position-relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    className="form-control"
    placeholder="Password"
    required
    value={pass}
    onChange={(e) => setPass(e.target.value)}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="position-absolute top-50 end-0 translate-middle-y pe-3"
    style={{ cursor: 'pointer' }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

            {/* Submit Button */}
            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-danger w-50 rounded-pill">
                Register
              </button>
              <p className="mt-3">
                Already have an account?{' '}
                <Link to="/log_exb" className="text-decoration-underline">
                  Login here
                </Link>
              </p>
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
