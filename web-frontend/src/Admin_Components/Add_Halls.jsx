import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const HallForm = () => {
  const [form, setForm] = useState({
    hall_no: "",
    no_of_booth: "",
    events: "",
  });

  const [eventsList, setEventsList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/eproject/get_events");
        setEventsList(res.data);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/eproject/halls/", form);
      setMessage("✅ Hall added successfully!");
      setForm({ hall_no: "", no_of_booth: "", events: "" });
    } catch (err) {
      console.error("Error adding hall:", err);
      const errMsg = err.response?.data?.error || "Something went wrong.";
      setError("❌ " + errMsg);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container py-5">
            <div className="card shadow p-4">
              <h2 className="mb-4 text-center">Add New Hall</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Hall Number</label>
                  <input
                    type="text"
                    name="hall_no"
                    className="form-control"
                    placeholder="Enter Hall No"
                    value={form.hall_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Booths</label>
                  <input
                    type="number"
                    name="no_of_booth"
                    className="form-control"
                    placeholder="Enter No. of Booths"
                    value={form.no_of_booth}
                    onChange={handleChange}
                    required
                    min={1}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Select Event</label>
                  <select
                    name="events"
                    className="form-select"
                    value={form.events}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Event --</option>
                    {eventsList.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Add Hall
                </button>
              </form>

              {message && <div className="alert alert-success mt-3">{message}</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallForm;
