import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import React, { useState } from 'react';


export default function Schedule_forms() {
  let[speaker,setSpeaker]=useState("");
  let[topic,setTopic]=useState("");
  let[location,setLocation]=useState("");
  let[sdate,setSdate]=useState(0);
  let[edate,setEdate]=useState(0);
 
  function clear(){
    setSpeaker("");
    setTopic("");
    setLocation("");
    setSdate(0);
    setEdate(0);
}

async function save_event(e) {
  try {     
      e.preventDefault();
      await axios.post("http://localhost:4000/eproject/a_schedule", {
        speaker:speaker,
        topic:topic,
         location:location,
         start_date:sdate,
         end_date:edate
  })
  console.log("send schedule Successfully");
  toast.success("send schedule Successfully");
  clear();
    } catch (error) {
      toast.error(error)
    }
  }



  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container py-5">
              <div className="card shadow-lg border-0">
                <div className="row g-0">
                  {/* Optional left image or branding section */}
                  <div 
  className="col-lg-5 d-none d-lg-flex align-items-center justify-content-center text-white"
  style={{ background: "linear-gradient(180deg, #000000 10%, #224abe 100%)" }}
>
  <div className="text-center p-4">
    <h2 className="fw-bold">Schedule Management</h2>
    <p>Create and manage schedule!</p>
  </div>
</div>


                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <h1 className="h4 text-gray-900">Create New Schedule</h1>
                      </div>

                      <form>
                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <label className="form-label">Speaker</label>
                            <input type="text" className="form-control" placeholder="Enter speaker name"  value={speaker} onChange={(e)=> setSpeaker(e.target.value)}/>
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">Topic</label>
                            <input type="text" className="form-control" placeholder="Enter topic"  value={topic} onChange={(e)=>setTopic(e.target.value)}/>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Location</label>
                            <input type="text" className="form-control" placeholder="Enter location"  value={location} onChange={(e)=> setLocation(e.target.value)}/>
                        </div>

<div className="row mb-3">
  <div className="row mb-3">
  <div className="col-sm-6">
    <label className="form-label">Start Date</label>
    <input 
      type="date" 
      className="form-control"  
      value={sdate} 
      onChange={(e)=> setSdate(e.target.value)}
      min={new Date().toISOString().split("T")[0]}   
    />
  </div>

  <div className="col-sm-6">
    <label className="form-label">End Date</label>
    <input 
      type="date" 
      className="form-control"  
      value={edate} 
      onChange={(e)=> setEdate(e.target.value)}
      min={new Date().toISOString().split("T")[0]}  
    />
  </div>
</div>

</div>

                        <button type="submit" onClick={save_event} className="btn btn-primary w-100">
                          Create Schedule
                        </button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div >
      <Footer />
    </div >
  )
}
