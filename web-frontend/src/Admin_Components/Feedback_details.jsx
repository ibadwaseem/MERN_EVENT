import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css";

export default function Feedback_details() {
    const [feed_data, setFeed_data] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        try {
            const response = await axios.get("http://localhost:4000/eproject/get_feed");
            setFeed_data(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function delete_data(id) {
        try {
            if (window.confirm("Are You Sure You Want To Delete This User")) {
                await axios.delete(`http://localhost:4000/eproject/del_feed/${id}`);
                get_data();
                toast.info("This User's Data Has Been Deleted Successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error deleting data");
        }
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = feed_data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(feed_data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <><div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <h1 className="h3 mb-4 text-gray-800 text-center">Feedback Details</h1>

                        {feed_data.length === 0 ? (
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="card-title text-danger">No Feedback Found</h4>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="row">
                                    {currentItems.map((a) => (
                                        <div className="col-md-6 mb-4" key={a._id}>
                                            <div className="card shadow">
                                                <a href={`#feedback${a._id}`} className="d-block card-header py-3" data-toggle="collapse"
                                                    role="button" aria-expanded="true" aria-controls={`feedback${a._id}`}>
                                                    <h6 className="m-0 font-weight-bold text-primary">{a.name}</h6>
                                                </a>
                                                <div className="collapse show" id={`feedback${a._id}`}>
                                                    <div className="card-body">
                                                        <p><strong>Email:</strong> {a.email}</p>
                                                        <p><strong>Feedback:</strong> {a.msg}</p>
                                                        <hr />
                                                        <button className='btn btn-outline-danger' onClick={() => delete_data(a._id)}>
                                                            <i className="bi bi-trash3-fill"></i> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
                                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div><Footer /></>

    );
}
