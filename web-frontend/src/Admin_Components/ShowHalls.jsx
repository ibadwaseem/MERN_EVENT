import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const res = await axios.get("http://localhost:4000/eproject/halls");
      setHalls(res.data);
      setFilteredHalls(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching halls:", err.message);
      setError("Failed to fetch halls.");
      setLoading(false);
    }
  };

  // Filter on search
  useEffect(() => {
    const filtered = halls.filter((hall) =>
      hall.hall_no.toLowerCase().includes(search.toLowerCase()) ||
      hall.events?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHalls(filtered);
  }, [search, halls]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hall?")) return;

    try {
      await axios.delete(`http://localhost:4000/eproject/halls/${id}`);
      setMessage("Hall deleted successfully.");
      fetchHalls(); // Refresh list
    } catch (err) {
      console.error("Error deleting hall:", err.message);
      setMessage("Error deleting hall.");
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container py-5">
            <h2 className="mb-4">All Halls</h2>

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by Hall No or Event Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {message && <div className="alert alert-info">{message}</div>}
            {loading && <p>Loading halls...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && filteredHalls.length === 0 && (
              <div className="card shadow-sm text-center my-5 py-5">
                <div className="card-body">             
                  <h5 className="card-title">No Halls Found</h5>
                  <p className="card-text">Try a different search or come back later.</p>
                </div>
              </div>
            )}

            <div className="row">
              {filteredHalls.map((hall) => (
                <div key={hall._id} className="col-md-4 mb-4">
                  <div className="card shadow h-100">
                    <div className="card-body">
                      <h5 className="card-title">Hall No: {hall.hall_no}</h5>
                      <p className="card-text">
                        <strong>Booths:</strong> {hall.no_of_booth}
                      </p>
                      <p className="card-text">
                        <strong>Event:</strong> {hall.events?.title || "N/A"}
                      </p>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDelete(hall._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HallList;
