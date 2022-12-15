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
    let haserror=false;
    let error;
    if(!req.session.user)
    return res.redirect("/login")
    let email= req.session.user.email
    try{
      var sol=await userData.getuserinfoforuserprofile(email)
      return res.status(200).render('userprofile', { solution1: sol,title: "User Details",haserror:haserror,error:error });
    } catch(e){haserror=true;error=e;
      return res.status(400).render('userprofile', { solution1: sol,title: "User Details" ,haserror:haserror,error:error});}
      res.status(500).render('userprofile', { solution1: sol,title: "User Details",haserror:haserror,error:error });
    });



    router.route("/userProfile/editdetails").get(async (req, res) => {
        //code here for GET
        if(!req.session.user)
        return res.redirect("/login")
        let haserror=false;
        let error;

        let email=req.session.user.email;
        try{
        if(!email) {
          throw "No logged in user"
        }

        if(typeof(email)!=="string")
        {throw "user email is not a string" }
        email=email.trim()
        if(email.length===0)
        {throw "No user email is given or is all white spaces" }
        var sol=await userData.getuserinfoforuserprofile(email)
       return res.status(200).render('edituserdetails', { solution1: sol,title: "Edit User",haserror:haserror,error:error});
      } catch(e){haserror=true;error=e;
        return res.status(400).render('edituserdetails', { solution1: sol,title: "Edit User",haserror:haserror,error:error});}
      
      res.status(500).render('edituserdetails', { solution1: sol,title: "Edit User",haserror:haserror,error:error});
      });


      router.route("/userProfile/editdetails").post(async (req, res) => {
        if(!req.session.user)
        return res.redirect("/login")
        
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
    res.redirect("/userprofile")
   }
       });

    module.exports = router;