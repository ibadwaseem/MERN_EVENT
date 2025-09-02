import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
    let nav = useNavigate();


    useEffect(() => {
       let condintion =JSON.parse(localStorage.getItem("users-data")) ;
       if (!condintion) {
            nav("/login")
       }
      }, []);

      function logout() {
        localStorage.removeItem("users-data");
        nav("/login")
      }
      
  return (
    <div>
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

<Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
    <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
    </div>
    <div className="sidebar-brand-text mx-3">ESM</div>
</Link>

<hr className="sidebar-divider my-0"/>

<li className="nav-item active">
    <Link className="nav-link" to="/admin">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></Link>
</li>

<hr className="sidebar-divider"/>

<div className="sidebar-heading">
    Interface
</div>

<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded="true" aria-controls="collapseTwo">
        <i className="fas fa-fw fa-cog"></i>
        <span>Components</span>
    </a>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6> 
            {/* <a className="collapse-item" href="buttons.html">Buttons</a>
            <Link className="collapse-item" to="/cards">Cards</Link> */}
            <Link className="collapse-item" to="/event">Events Form</Link>
            <Link className="collapse-item" to="/schedule">Schedule Form</Link>
            <Link className="collapse-item" to="/event_details">Event's Details</Link>
            <Link className="collapse-item" to="/schedule_details">Schedule's Details</Link>
            <Link className="collapse-item" to="/feed_details">Feedback's Details</Link> 
            <Link className="collapse-item" to="/con_details">Contact's Details</Link> 
            {/* <Link className="collapse-item" to="/rat_details">Rating's Details</Link>  */}
            <Link className="collapse-item" to="/add_hall">Add Halls</Link> 
            <Link className="collapse-item" to="/Show_halls">Halls Details</Link> 
            <Link className="collapse-item" to="/add_stall">Add stall</Link> 
            <Link className="collapse-item" to="/show_stall">Show Stalls</Link> 
            <Link className="collapse-item" to="/show_bstall">Booked Stalls</Link> 





        </div>
    </div>
</li>

{/* <li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-wrench"></i>
        <span>Utilities</span>
    </a>
    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="utilities-color.html">Colors</a>
            <a className="collapse-item" href="utilities-border.html">Borders</a>
            <a className="collapse-item" href="utilities-animation.html">Animations</a>
            <a className="collapse-item" href="utilities-other.html">Other</a>
        </div>
    </div>
</li> */}

<hr className="sidebar-divider"/>

<div className="sidebar-heading">
    Addons
</div>

<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
        aria-expanded="true" aria-controls="collapsePages">
        <i className="fas fa-fw fa-folder"></i>
        <span>Pages</span>
    </a>
    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <Link className="collapse-item" to="/login">Login</Link>
            <Link className="collapse-item" to="/register">Register</Link>
            <div className="collapse-divider"></div>
            {/* <h6 className="collapse-header">Other Pages:</h6>
            <a className="collapse-item" href="404.html">404 Page</a>
            <Link className="collapse-item" to="/blank">Blank Page</Link> */}
        </div>
    </div>
</li>

<li className="nav-item">
    <button className="nav-link " type='button' onClick={logout}>
        <i className="fas fa-fw fa-chart-area"></i>
        <span>Logout</span></button>
</li>

{/* <li className="nav-item">
    <Link className="nav-link" to="/tables">
        <i className="fas fa-fw fa-table"></i>
        <span>Tables</span></Link>
</li> */}

<hr className="sidebar-divider d-none d-md-block"/>

{/* <div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle"></button>
</div> */}

{/* <div className="sidebar-card d-none d-lg-flex">
    <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
    <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
</div> */}

</ul>
    </div>
  )
}
