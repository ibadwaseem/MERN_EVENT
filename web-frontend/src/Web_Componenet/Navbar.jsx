import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  let nav = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); // from auth context or state
  const [rating, setRating] = useState(0);

  // Assuming you have auth state or context like this
  const isLoggedIn = JSON.parse(localStorage.getItem("user_data")); // or useContext(AuthContext)

  // Handle clicking the "Rate Us" button
  const handleRateUsClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/log_vis"; // redirect to visitor login
    } else {
      setEmail(isLoggedIn?.email); // Get email from storage
      setShowModal(true); // Show modal for rating
    }
  };

  // Handle rating submission
  const handleSubmitRating = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
  
    try {
      // Send the POST request to backend with rating data
      const res = await axios.post("http://localhost:4000/eproject/rate", {
        email: email,
        stars: rating, // Ensure this is sent as 'stars'
      });
  
      // Check if the response is successful
      if (res.data.success) {
        alert("Thank you for rating us!");
      } else {
        alert("There was an issue submitting your rating. Please try again.");
      }
  
      setShowModal(false); // Close the modal after submission
    } catch (err) {
      console.error("Axios error: ", err.response);
      alert("Error submitting rating.");
    }
  };

  function logout() {
    localStorage.removeItem("user_data");
    nav("/log_exb")
  }

  return (
    <div>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="index.html" className="logo d-flex align-items-center me-auto">
            <img src="assets/img/logo.png" alt="" />
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><Link to="/" className="active">Home<br /></Link></li>
              {/* <li><Link to="/">Speakers</Link></li>
              <li><Link to="/">Schedule</Link></li>
              <li><Link to="/">Venue</Link></li> */}
              <li><Link to="/book_panel">Booking_Stall's_Panel</Link></li>
              <li className="dropdown">
                <a href="#"><span>Registrations</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><Link to="/log_exb">Login As Exhibitor</Link></li>
                  <li><Link to="/Log_vis">SignIn As Visitor</Link></li>
                  {/* <li><Link to="/feedback">Feedback</Link></li> */}
                </ul>
              </li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li className="nav-item">
                <button type='button'
                  className="btn btn-outline-danger rounded-pill ms-2"
                  onClick={logout}
                >
                  Login
                </button>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          {/* <a className="cta-btn d-none d-sm-block" href="#buy-tickets">Buy Tickets</a> */}
        </div>
      </header>

      {/* {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rate Our Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p>Your Email: <strong>{email}</strong></p>
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi bi-star${star <= rating ? "-fill" : ""} fs-3 text-warning`}
                      onClick={() => setRating(star)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
