import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css";

export default function Event_details() {
    const [event_data, setEvent_data] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        try {
            const response = await axios.get("http://localhost:4000/eproject/get_events");
            setEvent_data(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function delete_data(id) {
        try {
            if (window.confirm("Are You Sure You Want To Delete This User")) {
                await axios.delete(`http://localhost:4000/eproject/del_events/${id}`);
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
    const currentItems = event_data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(event_data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    let [title, setTitle] = useState("");
    let [dis, setDis] = useState("");
    let [loc, setLoc] = useState("");
    let [the, setThe] = useState("");
    let [id, setId] = useState("");
    let [sd, setSd] = useState(0);
    let [ed, setEd] = useState(0);

    function fetch_data (a,b,c,d,e,f,g) {
        setTitle(a);
        setThe(b);
        setLoc(c);
        setDis(d);
        setSd(e);
        setEd(f)
        setId(g);
    }

    async function update_data() {
        try {
            await axios.put(`http://localhost:4000/eproject/update_events/${id}`, {
                title:title,
         theme:the,
         location:loc,
         description:dis,
         start_date:sd,
         end_date:ed
            }).then((e)=>{
                get_data();
                toast.success(e.data.msg)
                document.querySelector(".close").click()
            })
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <><div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <h1 className="h3 mb-4 text-gray-800 text-center">Event Details</h1>

                        {event_data.length === 0 ? (
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="card-title text-danger">No Event Found</h4>
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
                                                    <h6 className="m-0 font-weight-bold text-primary">{a.title}</h6>
                                                </a>
                                                <div className="collapse show" id={`feedback${a._id}`}>
                                                    <div className="card-body">
                                                        <p><strong>Location:</strong> {a.location}</p>
                                                        <p><strong>Theme:</strong> {a.theme}</p>
                                                        <p><strong>Start Date:</strong> {a.start_date}</p>
                                                        <p><strong>End Date:</strong> {a.end_date}</p>
                                                        <p><strong>Description:</strong> {a.description}</p>
                                                        <hr />
                                                        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => fetch_data(a.title, a.theme, a.location, a.description, a.start_date, a.end_date, a._id)}>
                                                            <i className="bi bi-pencil-square"></i> Update</button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <button className='btn btn-outline-danger' onClick={() => delete_data(a._id)}>
                                                            <i className="bi bi-trash3-fill"></i> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Data</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <input type="text" className='form-control mt-2' placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value); } } />
                                                    <input type="text" className='form-control mt-2' placeholder='Theam' value={the} onChange={(e) => { setThe(e.target.value); } } />
                                                    <input type="text" className='form-control mt-2' placeholder='Location' value={loc} onChange={(e) => { setLoc(e.target.value); } } />
                                                    <textarea className="form-control mt-2" rows="4" placeholder='Descripation' value={dis} onChange={(e) => setDis(e.target.value)}></textarea>
                                                    <input type="text" className='form-control mt-2' placeholder='Start date' value={sd} onChange={(e) => { setSd(e.target.value); } } />
                                                    <input type="text" className='form-control mt-2' placeholder='End date' value={ed} onChange={(e) => { setEd(e.target.value); } } />
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" onClick={update_data}>update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>






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
