let express=require('express');
let route=express.Router();

let fun=require("../Function/Logic")

route.post("/a_reg",fun.admin_register);
route.post("/exb_reg",fun.register_exb);
route.post("/a_log",fun.admin_login);
route.post("/exb_log",fun.exb_login);
route.post("/a_hall",fun.halls);
route.post("/a_feed",fun.feedback);
route.get("/get_feed",fun.show_feedback);
route.delete("/del_feed/:id",fun.delete_feedback);
route.post("/a_cont",fun.contact);
route.get("/get_cont",fun.show_contact);
route.delete("/del_cont/:id",fun.delete_contact);
route.post("/a_events",fun.events);
route.get("/get_events",fun.show_events);
route.get("/get_event/:id",fun.get_event);
route.delete("/del_events/:id",fun.delete_events);
route.put("/update_events/:id",fun.update_events);
route.post("/w_reg",fun.register_user);
route.post("/w_log",fun.login_user);
route.post("/a_forgot",fun.a_forgot_pswd)
route.post("/a_resetpswd/:token",fun.a_reset_pswd)
route.post("/exb_forgot",fun.exb_forgot_pswd)
route.post("/exb_resetpswd/:token",fun.exb_reset_pswd)
route.post("/forgot",fun.forgot_pswd)
route.post("/resetpswd/:token",fun.reset_pswd)
route.post("/rate",fun.rate)
route.post("/a_schedule",fun.schedule);
route.get("/get_schedule",fun.show_schedule);
route.delete("/del_schedule/:id",fun.delete_schedule);
route.put("/update_schedule/:id",fun.update_schedule);


route.get("/rate", async (req, res) => {
  const ratings = await req.find().sort({ date: -1 });
  res.json(ratings);
})





module.exports=route