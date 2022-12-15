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
  let haserror=false;
  let isLoggedIn;
  let error;
  try{
    var sol=await adminData.getadminflightlist()
    

 
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;

    return res.status(200).render('adminhomepage', { solution1: sol,title: "Flights Available", isLoggedIn : isLoggedIn,haserror:haserror,error:error });
  }catch(e){
    haserror=true;
    error=e; 
    return res.status(400).render('adminhomepage', { solution1: sol,title: "Flights Available", isLoggedIn : isLoggedIn,haserror:haserror,error:error });
  }
  res.status(500).render('adminhomepage', { solution1: sol,title: "Flights Available", isLoggedIn : isLoggedIn,haserror:haserror,error:error });
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
    let isLoggedIn;
    let error;
    let haserror=false;
    try{
    if(!fid) {
      throw "No flight id is given." 
    }
    if(typeof(fid)!=="string")
    {throw "Flight Id is not a string" } 
    fid=fid.trim()
    if(fid.length===0)
    {throw "No Flight Id is given or is all white spaces" }
  req.params.id=req.params.id.trim()
    var sol=await flights.getFlightById(fid)
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;
    return res.status(200).render('editadmin', { solution1: sol,title: "Edit Flight" , isLoggedIn : isLoggedIn,haserror:haserror,error:error});
  }catch(e){error=e;
    haserror=true
  return res.status(400).render('editadmin', { solution1: sol,title: "Edit Flight" , isLoggedIn : isLoggedIn,haserror:haserror,error:error});
 }
  res.status(500).render('editadmin', { solution1: sol,title: "Edit Flight" , isLoggedIn : isLoggedIn,haserror:haserror,error:error});
  });


  router.route("/admin/editflight/:id").post(async (req, res) => {
     const newflightcode = req.body.flightcodeInput
     const newdeparture = req.body.departureInput
     const newarrival= req.body.arrivalInput
     const newdepartureDate=req.body.departureDateInput
     const newdeparturetime =req.body.departimeInput
     const newarrivalDate= req.body.arrivalDateInput
     const newarrivaltime=req.body.arrTimeInput
     const newduration=req.body.durationInput
     const newmiles=req.body.milesInput
     const fid=req.params.id
     
 
   try{
   const newflight = await flightData.updateFlight(fid,newflightcode,newdeparture,newarrival,newdepartureDate,newdeparturetime,newarrivalDate,newarrivaltime,newduration,newmiles)
   return res.redirect('/admin')
   
}catch(e){ 
  return res.redirect('/admin')
}
});


router.route("/admin/deleteflight/:id").get(async (req, res) => {
  try {
    let fid = req.params.id;
    console.log(fid);

    let isLoggedIn;
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;

    let flightDeleted = await flightData.removeFlight(fid);
    //console.log(flightDeleted);
    res.redirect('/admin');
  } catch (error) {
    console.log(error);
    res.redirect('admin');
  }
  
});


module.exports = router;