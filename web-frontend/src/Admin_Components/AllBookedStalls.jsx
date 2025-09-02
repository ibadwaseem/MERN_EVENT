
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const BookedStallsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Jab component mount ho, tab API call karke data laenge
    const fetchBookedStalls = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/stalls/booked');
        // Assume response me { bookings: [...] } structure hai
        setBookings(res.data.bookings || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching booked stalls:', err.response.data.message);
        setError('Failed to load booked stalls.');
        setLoading(false);
      }
    };

    fetchBookedStalls();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading booked stalls...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <Navbar />
            <div className="container-fluid">
    <div className="container py-5">
      <h2 className="mb-4">All Booked Stalls</h2>

      {bookings.length === 0 ? (
        <p>No stalls have been booked yet.</p>
      ) : (
        bookings.map((booking) => {
          // booking.ExhibitorId agar populate hua hai to usme .name or .email milega
          const exhibitorName = booking.ExhibitorId?.name || 'Unknown Exhibitor';
          const exhibitorEmail = booking.ExhibitorId?.email || 'N/A';
          const bookedStallNos = Array.isArray(booking.stallNo)
            ? booking.stallNo.join(', ')
            : booking.stallNo;
          const bookedDate = new Date(booking.bookingDate).toLocaleString();

          return (
            <div
              key={booking._id}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <h5 className="card-title">
                  Exhibitor: <strong>{exhibitorName}</strong>
                </h5>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {exhibitorEmail}
                </p>
                <p className="card-text mb-1">
                  <strong>Stall No(s):</strong> {bookedStallNos}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Booked On: {bookedDate}
                  </small>
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default BookedStallsPage;
