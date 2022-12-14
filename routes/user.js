const express = require('express');
const router = express.Router();
const data = require('../data');
const  userData = require('../data/userfunctions')
const path = require('path');
const { flights } = require('../data');
const flight=data.flights
const mongoCollections = require('../config/mongoCollections');

const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const flightData = require('../data/flights.js');
const userd=require("../data/usersCollection")

router.route("/userProfile").get(async (req, res) => {
    // need to add session coonditions
    let email= req.session.user.email
    try{
      var sol=await userData.getuserinfoforuserprofile(email)
      
    } catch(e){res.status(404).render("error",{class:"error",title:"Error", error: "N/A"});return}
    
    res.render('userprofile', { solution1: sol,title: "User Details" });
    });



    router.route("/userProfile/editdetails").get(async (req, res) => {
        //code here for GET
        let email=req.session.user.email;
        if(!email) {
          res.status(400).render("error",{class:"error", title: "Error ",error: "No logged in user" })
        }
        if(typeof(email)!=="string")
        {res.status(400).render("error",{class:"error", title:"Error",error: "user email is not a string" });return} 
        email=email.trim()
        if(email.length===0)
        {email.status(400).render("error",{class:"error",title:"Error", error: "No user email is given or is all white spaces" });return}
      
      try{
        var sol=await userData.getuserinfoforuserprofile(email)
      } catch(e){;res.status(404).render("error",{class:"error",title:"Error", error: "No user found with that email"});return}
      
      res.render('edituserdetails', { solution1: sol,title: "Edit User" });
      });


      router.route("/userProfile/editdetails").post(async (req, res) => {
        let email1=req.session.user.email;
        var sol=await userd.getUserByEmail(email1)
        const id=sol._id
        const newfirstname = req.body.firstnameInput
        const newlastname = req.body.lastnameInput
        const  email=sol.email
        const password=sol.password



      try{
        
      const newuser = await userd.updateUser(id,newfirstname,newlastname)
     
      res.redirect("/userprofile")
   }catch(e){//console.log(e)
   }
       });

    module.exports = router;