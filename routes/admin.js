const express = require('express');
const router = express.Router();
const data = require('../data');
const adminData = data.adminfunctions;
const path = require('path');
const { flights } = require('../data');
const flight=data.flights
const mongoCollections = require('../config/mongoCollections');

const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');

const flightData = require('../data/flights.js');



router.route("/admin").get(async (req, res) => {
  try{
    var sol=await adminData.getadminflightlist()
    
  } catch(e){res.status(404).render("error",{class:"error",title:"Error", error: "No Flights available"});return}
  let isLoggedIn;
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;
  res.render('adminhomepage', { solution1: sol,title: "Flights Available", isLoggedIn : isLoggedIn });
  });

router.route("/admin/addflight")
  .get(async (req, res) => {
    try {
      res.render("newFlight", { title: "Add Flight" });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      let newFlightData = req.body;
      console.log(newFlightData);

      const addFlightRes = await flights.createFlight(newFlightData.flight_code, newFlightData.departure, newFlightData.arrival,
        newFlightData.dept_date, newFlightData.dept_time, newFlightData.arrival_date, newFlightData.arrival_time,
        newFlightData.flight_duration, newFlightData.miles);

      res.redirect("/admin");
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
router.route("/admin/editflight/:id").get(async (req, res) => {
    //code here for GET
    let fid=req.params.id;
    if(!fid) {
      res.status(400).render("error",{class:"error", title: "Error ",error: "No flight id is given." })
    }
    if(typeof(fid)!=="string")
    {res.status(400).render("error",{class:"error", title:"Error",error: "Flight Id is not a string" });return} 
    fid=fid.trim()
    if(fid.length===0)
    {res.status(400).render("error",{class:"error",title:"Error", error: "No Flight Id is given or is all white spaces" });return}
  req.params.id=req.params.id.trim()
  try{
    var sol=await flights.getFlightById(fid)
  } catch(e){;res.status(404).render("error",{class:"error",title:"Error", error: "No Flight found with that id"});return}
  let isLoggedIn;
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;
  res.render('editadmin', { solution1: sol,title: "Edit Flight" , isLoggedIn : isLoggedIn});
  });


  router.route("/admin/editflight/:id").post(async (req, res) => {
     const newflightcode = req.body.flightcodeInput
     const newdeparture = req.body.departureInput
     const newarrival= req.body.arrivalInput
     const newdeparturetime =req.body.departimeInput
     const newarrivaltime=req.body.arrTimeInput
     const newduration=req.body.durationInput
     const newmiles=req.body.milesInput
     const newdate=req.body.dateInput
     const fid=req.params.id
     
 
   try{
   const newflight = await flightData.updateFlight(fid,newflightcode,newdeparture,newarrival,newdeparturetime,newarrivaltime,newduration,newmiles,newdate)
   res.redirect("/admin")
}catch(e){//console.log(e)
}
    });




  
  module.exports = router;
  
  