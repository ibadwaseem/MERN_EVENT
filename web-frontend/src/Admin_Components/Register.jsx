import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pswd, setPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  function clear() {
    setFname("");
    setLname("");
    setEmail("");
    setPhone("");
    setPswd("");
  }

  async function areg_data(e) {
    e.preventDefault();
    try {
      const fn_re = /^[A-Za-z_-]{3,20}$/;
      const ln_re = /^[A-Za-z_-]{3,20}$/;
      const p_re = /^(?:\+?\d{1,3})?[03]\d{9}$/;
      const pass_re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (!fname || !lname || !email || !phone || !pswd) {
        toast.error("All Fields Are Required");
      } else if (!fn_re.test(fname)) {
        toast.error("First Name Invalid (3-20 letters, _ or - allowed)");
      } else if (!ln_re.test(lname)) {
        toast.error("Last Name Invalid (3-20 letters, _ or - allowed)");
      } else if (!p_re.test(phone)) {
        toast.error("Phone Number Invalid");
      } else if (!pass_re.test(pswd)) {
        toast.error(
          "Password Invalid. Must be 8+ chars, with uppercase, lowercase, number & special char"
        );
      } else {
        await axios.post("http://localhost:4000/eproject/a_reg", {
          f_name: fname,
          l_name: lname,
          email: email,
          phone: phone,
          password: pswd,
        });
        toast.success("Data Saved Successfully");
        clear();
        nav("/admin");
      }
    } catch (error) {
      if (error.status === 409) {
        toast.error("Email Already Exists");
      } else {
        toast.error("Something went wrong!");
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                  <div className="card shadow-lg border-0 rounded-4">
                    <div className="row g-0">
                      <div className="col-lg-5 d-none d-lg-block">
                        <div
                          className="h-100 w-100 rounded-start"
                          style={{
                            backgroundImage: "url('https://source.unsplash.com/600x800/?technology,code')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                      <div className="col-lg-7">
                        <div className="card-body p-4 p-md-5">
                          <h3 className="mb-4 text-center fw-bold text-primary">
                            Admin Registration
                          </h3>
                          <form onSubmit={areg_data}>
                            <div className="row mb-3">
                              <div className="col">
                                <label className="form-label">First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="John"
                                  value={fname}
                                  onChange={(e) => setFname(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="col">
                                <label className="form-label">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Doe"
                                  value={lname}
                                  onChange={(e) => setLname(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="example@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label className="form-label">Phone</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="03XXXXXXXXX"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="col">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={pswd}
                                    onChange={(e) => setPswd(e.target.value)}
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                  >
                                    {showPassword ? (
                                      <i className="bi bi-eye-slash-fill"></i>
                                    ) : (
                                      <i className="bi bi-eye-fill"></i>
                                    )}
                                  </button>
                                </div>
                                <div className="form-text">
                                  Must be 8+ chars with uppercase, lowercase, number & special char.
                                </div>
                              </div>
                            </div>
                            <div className="d-grid mt-4">
                              <button type="submit" className="btn btn-primary rounded-pill py-2">
                                Register Account
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
