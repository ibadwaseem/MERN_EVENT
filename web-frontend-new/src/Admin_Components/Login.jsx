import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  let [email, setEmail] = useState("");
  let [pswd, setPswd] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let nav = useNavigate();

  async function admin_login(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/eproject/a_log", {
        email: email,
        password: pswd,
      });
      toast.success(response.data.msg);
      localStorage.setItem("users-data", JSON.stringify(response.data.user));
      setEmail("");
      setPswd("");
      nav("/admin");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                  <div className="card shadow-lg border-0">
                    <div className="row g-0">
                      <div
                        className="col-lg-6 d-none d-lg-block"
                        style={{
                          backgroundImage:
                            "url('https://source.unsplash.com/600x800/?login,technology')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderTopLeftRadius: ".25rem",
                          borderBottomLeftRadius: ".25rem",
                        }}
                      ></div>
                      <div className="col-lg-6">
                        <div className="card-body p-5">
                          <h1 className="h4 text-center text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                          <form onSubmit={admin_login}>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email Address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3 position-relative">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <div className="input-group">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className="form-control"
                                  id="password"
                                  placeholder="Password"
                                  value={pswd}
                                  onChange={(e) => setPswd(e.target.value)}
                                  required
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                  tabIndex={-1}
                                  aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                  }
                                >
                                  {showPassword ? (
                                    <i className="bi bi-eye-slash-fill"></i>
                                  ) : (
                                    <i className="bi bi-eye-fill"></i>
                                  )}
                                </button>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary w-100 py-2"
                            >
                              Login
                            </button>
                          </form>
                          <hr />
                          <div className="text-center">
                            <Link className="small" to="/a_forget">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
