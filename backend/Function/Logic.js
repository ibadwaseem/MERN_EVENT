let admin =require("../Collection/Admin");
let user=require("../Collection/User");
let feed = require("../Collection/Feedback");
let contactUs = require("../Collection/ContactUs");
let events = require("../Collection/Events");
let hall = require("../Collection/Hall");
let brcypt= require("bcrypt");
const {use}=require("../Routing/Route");
let jwt = require("jsonwebtoken");
let exibitor =require("../Collection/Exhibitor");
let Rating = require("../Collection/RateUs")
require("dotenv").config()
let nodemailer=require("nodemailer");
const Exhibitor = require("../Collection/Exhibitor");
let schedule = require("../Collection/Schedule");

let email_info=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS_KEY
    }
})

let main_func={
    admin_register:async function(req,res){
        try {
            let{f_name,l_name,email,phone,password}=req.body;
            let check_email=await admin.findOne({email:email});
            if(check_email){
                return res.status(409).json({msg:"Email already exist"})
            }else{
                let b_pass=brcypt.hashSync(password,10)
                let admin_data=new admin({f_name,l_name,email,phone,password:b_pass})
                let save_admin=await admin_data.save();
                res.status(200).json({msg:"Admin registered successfully",data:save_admin})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
            
        }
    },
    admin_login:async function(req,res){
        try {
            let {email,password}=req.body;
            let check_email=await admin.findOne({email});
            if(!check_email){
                return res.status(404).json({msg:"Email not found"})
            }
            let check_password=brcypt.compareSync(password,check_email.password);
            if(!check_password){
                return res.status(404).json({msg:"Password is incorrect"})
            }
            let user_record=jwt.sign({id :check_email._id},process.env.SECRET_KEY,{expiresIn:"2d"});
            return res.status(201).json({msg:"Login successfully",user_record,user:{n
                :check_email.name,e:check_email.email
            }})
        } catch (error) {
            return res.status(501).json({msg:error.message})
        }
    },
    exb_login:async function(req,res){
        try {
            let {email,password}=req.body;
            let check_email=await exibitor.findOne({email});
            if(!check_email){
                return res.status(404).json({msg:"Email not found"})
            }
            let check_password=brcypt.compareSync(password,check_email.password);
            if(!check_password){
                return res.status(404).json({msg:"Password is incorrect"})
            }
            let user_record=jwt.sign({id :check_email._id},process.env.SECRET_KEY,{expiresIn:"2d"});
            return res.status(201).json({msg:"Login successfully",user_record,user:{n
                :check_email.name,e:check_email.email,
                id:check_email._id
            }})
        } catch (error) {
            return res.status(501).json({msg:error.message})
        }
    },

    feedback: async function(req,res) {
        try {
            let{name,email,msg}=req.body;
           
                let feedback_data=new feed({name,email,msg})
                let save_feedback= await feedback_data.save();
            res.status(200).json({msg:"Your Feedback Has Been Sent Successfully",data:save_feedback}) 
        }catch (error) {
            res.status(501).json({msg:error.message})
            
        }
    },

     show_feedback : async function (req, res) {
        try {
            let getFeedback_data = await feed.find();
            res.status(201).json(getFeedback_data);
        } catch (error) {
            res.status(501).json({msg: error.message})
        }
   },

   delete_feedback : async function (req,res) {
        try {
            let {id} = req.params;
            let find_id = await feed.findById(id);
            if (find_id) {
                    await feed.findByIdAndDelete(find_id);
                    return res.status(200).json({msg: "This User Feedback Has Been Deleted Successfully"})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
   },


    contact: async function(req,res) {
        try {
            let{name,email,subject,msg}=req.body;
           
                let cont_data=new contactUs({name,email,subject,msg})
                let save_contact= await cont_data.save();
            res.status(200).json({msg:"Your Contact Message Has Been Sent Successfully",data:save_contact}) 
        }catch (error) {
            res.status(501).json({msg:error.message})
        }
    },

    show_contact : async function (req, res) {
        try {
            let getContact_data = await contactUs.find();
            res.status(201).json(getContact_data);
        } catch (error) {
            res.status(501).json({msg: error.message})
        }
   },

   delete_contact : async function (req,res) {
        try {
            let {id} = req.params;
            let find_id = await contactUs.findById(id);
            if (find_id) {
                    await contactUs.findByIdAndDelete(find_id);
                    return res.status(200).json({msg: "This User Contact Has Been Deleted Successfully"})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
   },

    events: async function(req,res) {
        try {
            let{title,description,theme,location,start_date,end_date}=req.body;
                let events_data=new events({title,description,theme,location,start_date,end_date})
                let save_events= await events_data.save();
            res.status(200).json({msg:"Your Event's Data Has Been Saved Successfully",data:save_events}) 
        }catch (error) {
            res.status(501).json({msg:error.message})
        }
    },

    show_events : async function (req, res) {
        try {
            let getevents_data = await events.find();
            res.status(201).json(getevents_data);
        } catch (error) {
            res.status(501).json({msg: error.message})
        }
   },

   delete_events : async function (req,res) {
        try {
            let {id} = req.params;
            let find_id = await events.findById(id);
            if (find_id) {
                    await events.findByIdAndDelete(find_id);
                    return res.status(200).json({msg: "This Event Has Been Deleted Successfully"})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
   },

   update_events : async function (req,res) {
    try {
        let {id} = req.params;
        let {title,description,theme,location,start_date,end_date} = req.body;

        let find_id = await events.findById(id);
        if (find_id) {
            await events.findByIdAndUpdate(id,{title: title,description: description,theme: theme,location:location,start_date:start_date,end_date:end_date});
            res.status(200).json({msg: "This Event's Data Has Been Updated Successfully"})
        }
    } catch (error) {
        res.status(501).json({msg:error.message})
        }
    },

   register_user:async function(req,res){
        try {
            let {name,email,password,age,phone}=req.body;
            let checkemail= await user.findOne({email:email})
            if (checkemail){
                return res.status(404).json({msg:"email already exist"})
            }
            else{
                 let encrypted_pswd=brcypt.hashSync(password,15)
                let user_data=new user ({name,email,password:encrypted_pswd,age,phone})
                console.log(req.body)
                let create=await user_data.save();
                res.status(200).json({msg:"user Registeration successfully"})
               let Email_Body={
                to:email,
                from:process.env.EMAIL,
                subject:"Register Successfully",
                html:`<h3>Hi ${name}<br/><br/> Your Account Register Successfully, Congratulations .<br/>
                <a href='http://localhost:4000/eproject/i'>Continue on website<a/>
                </h3>`
                // yaha edit ho ga
               }
               email_info.sendMail(Email_Body,function(error,info){
                if(error){
                    console.log(error.message)
                }else{
                    console.log("Email has been sent successfully ")
                }
               })
            }
           
 } catch (error) {
            res.status(501).json({msg: error.message})
            
        }
    },

    login_user: async function(req,res){
        try {
            let {email,password}=req.body
            let find_user_email=await user.findOne({email})
            if(!find_user_email){
                return res.status(404).json({msg:"Email Not Found"})
            }
            let get_password=brcypt.compareSync(password,find_user_email.password)
            if(!get_password){
                return res.status(404).json({msg:"Password Not Found"})
            }
            let user_record=jwt.sign({id:find_user_email._id},process.env.SECRET_KEY,{expiresIn:"2d"})
            return res.status(201).json({
                msg:"login Successfully",
                user_record,
                user:{
                    n:find_user_email.name,
                    e:find_user_email.email
                }
            })
            
        } catch (error) {
            return res.status(501).json({msg:error.message})
            
        }
    },
    a_forgot_pswd:async function(req,res){
        try {
            let {email}=req.body
            let email_check=await admin.findOne({email})

            if (!email_check) {
                res.status(404).json({msg:"Email Does Not Exist"})
                
            }
            let random_set=jwt.sign({id:email_check.id},process.env.SECRET_KEY,{expiresIn:"10m"})
            let link=`http://localhost:3000/reset/${random_set}`
            let Email_body={
                to :email_check.email,
                from:process.env.EMAIL,
                subject:"Reset Your Password",
                html:`Hi ${email_check.name}<br/> your password link sent ${link}`
            }
            email_info.sendMail(Email_body,function(e,i){
                if (e) {
                     res.status(501).json({msg:e.message})
                    
                }else{
                     res.status(200).json({msg:"Password Reset link has been sent"})
                }
            })
        } catch (error) {

            res.status(501).json({msg:e.message})
        }
    },
    a_reset_pswd:async function (req,res){
        try {
            let {password}=req.body;
            let {token}=req.params;
            let fetch=jwt.decode(token,process.env.SECRET_KEY)
            if(!fetch){
                res.status(404).json({msg:"invalid Token"})

            }
            let ecp=brcypt.hashSync(password,12);
            await admin.findByIdAndUpdate(fetch.id,{password:ecp})
            res.status(201).json({msg:"password Reset Successfully"})
            
        } catch (error) {
            res.status(501).json({msg:error.message})
        }

    },
    exb_forgot_pswd:async function(req,res){
        try {
            let {email}=req.body
            let email_check=await exibitor.findOne({email})

            if (!email_check) {
                res.status(404).json({msg:"Email Does Not Exist"})
                
            }
            let random_set=jwt.sign({id:email_check.id},process.env.SECRET_KEY,{expiresIn:"10m"})
            let link=`http://localhost:3000/exb_reset/${random_set}`
            let Email_body={
                to :email_check.email,
                from:process.env.EMAIL,
                subject:"Reset Your Password",
                html:`Hi ${email_check.name}<br/> your password link sent ${link}`
            }
            email_info.sendMail(Email_body,function(e,i){
                if (e) {
                     res.status(501).json({msg:e.message})
                    
                }else{
                     res.status(200).json({msg:"Password Reset link has been sent"})
                }
            })
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
    },
    exb_reset_pswd:async function (req,res){
        try {
            let {password}=req.body;
            let {token}=req.params;
            let fetch=jwt.decode(token,process.env.SECRET_KEY)
            if(!fetch){
                res.status(404).json({msg:"invalid Token"})

            }
            let ecp=brcypt.hashSync(password,12);
            await exibitor.findByIdAndUpdate(fetch.id,{password:ecp})
            res.status(201).json({msg:"password Reset Successfully"})
            
        } catch (error) {
            res.status(501).json({msg:error.message})
        }

    },
    forgot_pswd:async function(req,res){
        try {
            let{email}=req.body;
            let email_check=await user.findOne({email})

            if (!email_check) {
                res.status(404).json({msg:"Email Does Not Exist"})
                
            }
            let random_set=jwt.sign({id:email_check.id},process.env.SECRET_KEY,{expiresIn:"10m"})
            let link=`http://localhost:3000/vis_reset/${random_set}`
            let Email_body={
                to :email_check.email,
                from:process.env.EMAIL,
                subject:"Reset Your Password",
                html:`Hi ${email_check.name}<br/> your password link sent ${link}`
            }
            email_info.sendMail(Email_body,function(e,i){
                if (e) {
                     res.status(501).json({msg:e.message})
                    
                }else{
                     res.status(200).json({msg:"Password Reset link has been sent"})
                }
            })
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
    },
    reset_pswd:async function (req,res){
        try {
            let {password}=req.body;
            let {token}=req.params;
            let fetch=jwt.decode(token,process.env.SECRET_KEY)
            if(!fetch){
                res.status(404).json({msg:"invalid Token"})

            }
            let ecp=brcypt.hashSync(password,12);
            await user.findByIdAndUpdate(fetch.id,{password:ecp})
            res.status(201).json({msg:"password Reset Successfully"})
            
        } catch (error) {
            res.status(501).json({msg:error.message})
        }

    },
    halls: async function (req,res) {
        try {
            
        } catch (error) {
            
        }
    },
    register_exb:async function(req,res){
        try {
            let {name,email,password,age,phone}=req.body;
            let checkemail= await exibitor.findOne({email:email})
            if (checkemail){
                return res.status(200).json({msg:"email already exist"})
            }
            else{
                 let encrypted_pswd=brcypt.hashSync(password,15)
                let user_data=new exibitor ({name,email,password:encrypted_pswd,age,phone})
                let create=await user_data.save();
                res.status(200).json({msg:"Exibirtor Registeration successfully"})
               let Email_Body={
                to:email,
                from:process.env.EMAIL,
                subject:"Register Successfully",
                html:`<h3>Hi ${name}<br/><br/> Your Account Register Successfully, Congratulations .<br/>
                <a href='http://localhost:3000/eproject/exb_log'>Continue on website<a/>
                </h3>`
                // yaha edit ho ga
               }
               email_info.sendMail(Email_Body,function(error,info){
                if(error){
                    console.log(error.message)
                }else{
                    console.log("Email has been sent successfully ")
                }
               })
            }
           
 } catch (error) {
            res.status(501).json({msg:error.message})
            
        }
    },
    
    rate : async (req, res) => {
        const { email, stars } = req.body;
      
        // Validation
        if (!email || !stars || stars < 1 || stars > 5) {
          return res.status(400).json({
            success: false,
            message: "Invalid data. Ensure email and stars (1-5) are provided."
          });
        }
      
        try {
          // Assuming you have a Rating model to save the rating data
          const newRating = new Rating({ email, stars });
          await newRating.save();
      
          return res.status(200).json({
            success: true,
            message: "Rating submitted successfully!"
          });
        } catch (err) {
          console.error("Error submitting rating:", err);
          return res.status(500).json({ success: false, message: "Server error" });
        }
    },

    verifyExhibitor:  (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded.role !== 'exhibitor') {
            return res.status(403).json({ message: 'Only exhibitors can access this route' });
          }
          req.user = decoded;
          next();
        } catch (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
      },
      
      schedule: async function(req,res) {
        try {
            let{speaker,topic,location,start_date,end_date}=req.body;
                let schedule_data=new schedule({speaker,topic,location,start_date,end_date})
                let save_schedule= await schedule_data.save();
            res.status(200).json({msg:"Your Schedule's Data Has Been Saved Successfully",data:save_schedule}) 
        }catch (error) {
            res.status(501).json({msg:error.message})
        }
    },
    show_schedule : async function (req, res) {
        try {
            let getschedule_data = await schedule.find();
            res.status(201).json(getschedule_data);
        } catch (error) {
            res.status(501).json({msg: error.message})
        }
   },
   delete_schedule : async function (req,res) {
    try {
        let {id} = req.params;
        let find_id = await schedule.findById(id);
        if (find_id) {
                await schedule.findByIdAndDelete(find_id);
                return res.status(200).json({msg: "This schedule Has Been Deleted Successfully"})
        }
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
},

update_schedule : async function (req,res) {
try {
    let {id} = req.params;
    let {speaker,topic,location,start_date,end_date} = req.body;

    let find_id = await schedule.findById(id);
    if (find_id) {
        await schedule.findByIdAndUpdate(id,{speaker:speaker,topic:topic,location:location,start_date:start_date,end_date:end_date});
        res.status(200).json({msg: "This Schedule's Data Has Been Updated Successfully"})
    }
} catch (error) {
    res.status(501).json({msg:error.message})
    }
},
    
}
module.exports=main_func;