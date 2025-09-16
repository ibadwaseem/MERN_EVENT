import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function EventDetails() {
  const { id } = useParams(); // get id from URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    get_event_details();
  }, [id]);

  async function get_event_details() {
    try {
      const res = await axios.get(`http://localhost:4000/eproject/get_event/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Error fetching event:", err);
    }
  }

  if (!event) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div>
      <Navbar />



      <main className="container my-5">
        <div className="card shadow-lg p-4">
          <img
            src="./assets/img/expo-img2.jpg"
            alt={event.title}
            className="img-fluid mb-4 rounded"
          />
          <h1 className="mb-3">{event.title}</h1>
          <h3 className="text-muted">{event.theme}</h3>
          <p>
            <strong>Start Date:</strong> {event.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {event.end_date}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
