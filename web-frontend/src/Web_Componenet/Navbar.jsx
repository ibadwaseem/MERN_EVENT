import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  let nav = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); // for the email of the logged-in user
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This effect runs only once when the component is mounted
  useEffect(() => {
    // Check if user_data exists in localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setIsLoggedIn(true);  // If user data exists, set logged in state to true
    } else {
      setIsLoggedIn(false);  // Otherwise, set it to false
    }
  }, []);  // Empty dependency array ensures this runs only once

  // Handle clicking the "Rate Us" button
  const handleRateUsClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/log_vis"; // Redirect to visitor login page if not logged in
    } else {
      setEmail(JSON.parse(localStorage.getItem("user_data"))?.email); // Get email from storage
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
      const res = await axios.post("http://localhost:4000/eproject/rate", {
        email: email,
        stars: rating,
      });
  
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

  // Logout function
  function logout() {
    localStorage.removeItem("user_data");  // Remove user data from localStorage
    setIsLoggedIn(false);  // Update state to reflect that the user is logged out
    nav("/log_exb");  // Redirect to exhibitor login page
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
              <li><Link to="/book_panel">Booking_Stall's_Panel</Link></li>
              <li className="dropdown">
                <a href="#"><span>Registrations</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><Link to="/log_exb">Login As Exhibitor</Link></li>
                  <li><Link to="/Log_vis">SignIn As Visitor</Link></li>
                </ul>
              </li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/contact">Contact</Link></li>

              {/* Conditionally render the logout button */}
              {isLoggedIn && (
                <li className="nav-item">
                  <button type="button"
                    className="btn btn-outline-danger rounded-pill ms-2"
                    onClick={logout}
                  >
                    logout
                  </button>
                </li>
              )}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

        </div>
      </header>
    </div>
  );
}
