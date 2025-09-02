import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css";

export default function Schedule_details() {
    const [schedule_data, setSchedule_data] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        try {
            const response = await axios.get("http://localhost:4000/eproject/get_schedule");
            setSchedule_data(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function delete_data(id) {
        try {
            if (window.confirm("Are You Sure You Want To Delete This User")) {
                await axios.delete(`http://localhost:4000/eproject/del_schedule/${id}`);
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
    const currentItems = schedule_data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(schedule_data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    let [speaker, setSpeaker] = useState("");
    let [topic, setTopic] = useState("");
    let [loc, setLoc] = useState("");
    let [id, setId] = useState("");
    let [sd, setSd] = useState(0);
    let [ed, setEd] = useState(0);

    function fetch_data (a,b,c,d,e,f) {
        setSpeaker(a);
        setTopic(b);
        setLoc(c);
        setSd(d);
        setEd(e)
        setId(f);
    }

    async function update_data() {
        try {
            await axios.put(`http://localhost:4000/eproject/update_schedule/${id}`, {
               speaker:speaker,
               topic:topic,
         location:loc,
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
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <h1 className="h3 mb-4 text-gray-800 text-center">Schedule Details</h1>

                        {schedule_data.length === 0 ? (
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="card-title text-danger">No Schedule Found</h4>
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
                                                    <h6 className="m-0 font-weight-bold text-primary">{a.topic}</h6>
                                                </a>
                                                <div className="collapse show" id={`feedback${a._id}`}>
                                                    <div className="card-body">
                                                        <p><strong>Speaker:</strong> {a.speaker}</p>
                                                        <p><strong>Location:</strong> {a.location}</p>
                                                        <p><strong>Start Date:</strong> {a.start_date}</p>
                                                        <p><strong>End Date:</strong> {a.end_date}</p>
                                                        <hr />
                                                        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>fetch_data
                                                            (a.speaker,a.topic,a.location,a.start_date,a.end_date,a._id)}>
                                                        <i className="bi bi-pencil-square"  ></i> Update</button>
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
        <input type="text" className='form-control mt-2' placeholder='Speaker' value={speaker} onChange={(e)=> {setSpeaker(e.target.value)}} />
        <input type="text" className='form-control mt-2' placeholder='Topic' value={topic} onChange={(e)=> {setTopic(e.target.value)}} />
        <input type="text" className='form-control mt-2' placeholder='Location' value={loc} onChange={(e)=> {setLoc(e.target.value)}} />
        <input type="text" className='form-control mt-2' placeholder='Start date' value={sd} onChange={(e)=> {setSd(e.target.value)}} />
        <input type="text" className='form-control mt-2' placeholder='End date' value={ed} onChange={(e)=> {setEd(e.target.value)}} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={update_data} >update</button>
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
            <Footer />
            <ToastContainer />
        </div>
    );
}
