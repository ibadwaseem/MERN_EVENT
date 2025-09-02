import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AddStallForm = () => {
  const [form, setForm] = useState({
    stall_no: "",
    name: "",
    capacity: "",
    description: "",
    hall: "",
  });

  const [halls, setHalls] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Flag to check if user manually edited the name field
  const isNameManuallyEdited = useRef(false);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get("http://localhost:4000/eproject/halls");
        setHalls(res.data);
      } catch (err) {
        console.error("Error fetching halls:", err.message);
        setMessage({ text: "Failed to load halls. Please try again later.", type: "error" });
      }
    };
    fetchHalls();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "name") {
      // User manually edited name, so set flag true
      isNameManuallyEdited.current = true;
      setForm((prev) => ({ ...prev, [name]: value }));
      return;
    }
  
    if (name === "stall_no") {
      // Agar user ne name manually edit nahi kiya hai tab hi name update karo
      setForm((prev) => ({
        ...prev,
        stall_no: value,
        name: !isNameManuallyEdited.current ? value + "B" : prev.name,
      }));
      return;
    }
  
    if (name === "hall") {
      // Hall selection change se naam update na ho
      setForm((prev) => ({
        ...prev,
        hall: value,
      }));
      return;
    }
  
    // Baaki sab fields normal update
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!form.stall_no.trim() || !form.name.trim() || !form.hall) {
      setMessage({ text: "Please fill all required fields.", type: "error" });
      return;
    }

    try {
      const payload = { ...form, capacity: Number(form.capacity) || 0 };
      await axios.post("http://localhost:4000/eproject/stalls/", payload);
      setMessage({ text: "Stall added successfully!", type: "success" });
      setForm({ stall_no: "", name: "", capacity: "", description: "", hall: "" });
      isNameManuallyEdited.current = false; // reset flag after successful submit
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || "Failed to add stall.";
      setMessage({ text: errMsg, type: "error" });
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <main className="container py-5" style={{ maxWidth: 700 }}>
            <h2 className="mb-4">Add Stall</h2>

            {message.text && (
              <div
                className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
                role="alert"
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="stall_no" className="form-label">
                    Stall Number <span className="text-danger">*</span>
                  </label>
                  <input
                    id="stall_no"
                    name="stall_no"
                    type="text"
                    value={form.stall_no}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter stall number"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter stall name"
                    required
                  />
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="capacity" className="form-label">
                    Capacity
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={form.capacity}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    placeholder="Enter capacity (optional)"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="hall" className="form-label">
                    Select Hall <span className="text-danger">*</span>
                  </label>
                  <select
                    id="hall"
                    name="hall"
                    value={form.hall}
                    onChange={handleChange}
                    className="form-select"
                    required
                    aria-label="Select hall"
                  >
                    <option value="">-- Select Hall --</option>
                    {halls.map((hall) => (
                      <option key={hall._id} value={hall._id}>
                        {hall.hall_no}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
  <label htmlFor="description" className="form-label">
    Availability <span className="text-danger">*</span>
  </label>
  <select
    id="description"
    name="description"
    value={form.description}
    onChange={handleChange}
    className="form-select"
    required
  >
    <option value="">-- Select Availability --</option>
    <option value="Available">Available</option>
    <option value="Not Available">Not Available</option>
  </select>
</div>
              <button type="submit" className="btn btn-primary w-100">
                Add Stall
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddStallForm;
