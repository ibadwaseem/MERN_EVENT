// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
// import "bootstrap-icons/font/bootstrap.icons.css"

import { BrowserRouter, Route, Routes } from 'react-router-dom';



import A_Index from './Admin_Components/A_Index';
import Login from './Admin_Components/Login';
import Register from './Admin_Components/Register';
import Events_Forms from './Admin_Components/Events_Forms';
import ContactUs_details from './Admin_Components/ContactUs_details';
import Feedback_details from './Admin_Components/Feedback_details';
import Feedback from './Web_Componenet/Feedback';
import Index from './Web_Componenet/Index';
import Login_exb from './Web_Componenet/Login_exb';
import Login_vis from './Web_Componenet/Login_vis';
import Register_vis from './Web_Componenet/Register_vis';
import Register_exb from './Web_Componenet/Register_exb';
import Forget from './Web_Componenet/Forget';
import Forget_as_exb from './Web_Componenet/Forget_as_exb';
import A_forget from './Admin_Components/A_forget';
import Event_details from './Admin_Components/Event_details';
import Reset_as_exb from  './Web_Componenet/Reset_as_exb';
import Reset from  './Web_Componenet/Reset';
import Reset_as_vis from  './Web_Componenet/Resert_as_vis';
import StallBooking from './Web_Componenet/StallBooking';
import Schedule_details from './Admin_Components/Schedule_details';
import Schedule_forms from './Admin_Components/Schedule_forms';
import A_Resetpass from './Admin_Components/A_Resetpass';
import Add_Halls from "./Admin_Components/Add_Halls";
import HallList from './Admin_Components/ShowHalls';
import AddStallForm from './Admin_Components/Add_Stall';
import ShowStalls from './Admin_Components/ShowStalls';
import BookedStallsPage from './Admin_Components/AllBookedStalls';
import ContactUs from './Web_Componenet/ContactUs';
import EventDetails from './Web_Componenet/EventDetails';





function App() {
  return (
    <BrowserRouter>
    <div className="App">

     <Routes>
     
     <Route path="/event/:id" element={<EventDetails />} />

      <Route path="/admin" element={<A_Index />}/>

      <Route path="/login" element={<Login />}/> 
      <Route path="/register" element={<Register />}/> 
    
      <Route path="/event" element={<Events_Forms />}/>
      <Route path="/schedule" element={<Schedule_forms />}/>
  
      <Route path="/event_details" element={<Event_details />}/>
      <Route path="/schedule_details" element={<Schedule_details />}/>
      <Route path="/con_details" element={<ContactUs_details />}/>
      <Route path="/feed_details" element={<Feedback_details />}/>
      <Route path="/a_forget" element={<A_forget />}/>
      <Route path="/add_hall" element={<Add_Halls />}/>
      <Route path="/Show_halls" element={<HallList />}/>
      <Route path="/add_stall" element={<AddStallForm />}/>
      <Route path="/show_stall" element={<ShowStalls />}/>
      <Route path="/show_bstall" element={<BookedStallsPage />}/>









      <Route path='/' element={<Index/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/reg_vis' element={<Register_vis/>}/>
        <Route path='/reg_exb' element={<Register_exb/>}/>
        <Route path='/log_vis' element={<Login_vis/>}/>
        <Route path='/log_exb' element={<Login_exb/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path='/reset/:token' element={<A_Resetpass/>}/>

        <Route path='/exb_forget' element={<Forget_as_exb/>}/>
        <Route path='/exb_reset/:token' element={<Reset_as_exb/>}/>
        <Route path='/vis_reset/:token' element={<Reset_as_vis/>}/>
        <Route path='/book_panel' element={<StallBooking/>}/>






     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
