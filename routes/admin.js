const express = require('express');
const router = express.Router();
const data = require('../data');
const bookingsData = require('../data/bookingCollection');
const classes = require('../data/class');
const adminData = data.adminfunctions;
const path = require('path');
const { flights } = require('../data');
const flight=data.flights
const mongoCollections = require('../config/mongoCollections');

const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');

const flightData = require('../data/flights.js');
const xss = require('xss');


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
  return res.status(500).render('adminhomepage', { solution1: sol,title: "Flights Available", isLoggedIn : isLoggedIn,haserror:haserror,error:error });
  
  });

router.route("/admin/addflight")
  .get(async (req, res) => {
    let haserror=false;
    let error;
    try {
      return res.status(200).render("newFlight", { title: "Add Flight",haserror:haserror,error:error});
    } catch (error) {haserror=true;error=e;
      return res.status(400).render("newFlight", { title: "Add Flight",haserror:haserror,error:error});
    }
    res.status(500).render("newFlight", { title: "Add Flight",haserror:haserror,error:error});
  })
  .post(async (req, res) => {
    try {
      let haserror=false;
      let erro;
      let newFlightData = req.body;
      //console.log(newFlightData);
      
     newFlightData.flight_code=await helper.checkifproperflightcode(xss(newFlightData.flight_code))
     newFlightData.departure=await helper.checkifproperdeparr(xss(newFlightData.departure))
     newFlightData.arrival=await helper.checkifproperdeparr(xss(newFlightData.arrival))
     newFlightData.dept_date=await helper.checkifproperDate(xss(newFlightData.dept_date))
     newFlightData.dept_time=await helper.checkifproperarrdepttime(xss(newFlightData.dept_time))
     newFlightData.arrival_date=await helper.checkifproperDate(xss(newFlightData.arrival_date))
     newFlightData.arrival_time=await helper.checkifproperarrdepttime(xss(newFlightData.arrival_time))
await helper.checkifpropermiles(xss(newFlightData.miles))
newFlightData.miles=newFlightData.miles.trim()




      const addFlightRes = await flights.createFlight(xss(newFlightData.flight_code), xss(newFlightData.departure), xss(newFlightData.arrival),
        xss(newFlightData.dept_date), xss(newFlightData.dept_time), xss(newFlightData.arrival_date), xss(newFlightData.arrival_time),
       xss(newFlightData.miles));

        
        // newFlightData.ft_seats, newFlightData.bs_seats, newFlightData.ec_seats,
        // newFlightData.ft_food_options, newFlightData.bs_food_options, newFlightData.ec_food_options, newFlightData.ft_price,
        // newFlightData.bs_price, newFlightData.ec_price

      if(!Number.isInteger(Number(xss(newFlightData.ft_seats))))
      throw "first class seat capacity should be integer"

      if(!Number.isInteger(Number(xss(newFlightData.bs_seats))))
      throw "business class seat capacity should be integer"
 
      if(!Number.isInteger(Number(xss(newFlightData.ec_seats))))
      throw "economy class seat capacity should be integer"

      newFlightData.ft_price=xss(newFlightData.ft_price)
      if(!newFlightData.ft_price)
      throw "first class price not provided";
   
      if(typeof(newFlightData.ft_price)!=="string")
      throw 'first class price is not a string';
      if(newFlightData.ft_price.trim().length===0)
      throw "first class price cant be empty or all white spaces";
   
      newFlightData.ft_price=newFlightData.ft_price.trim() 
      if(!(Number.isInteger(Number(newFlightData.ft_price)) && Number(newFlightData.ft_price) > 1 && Number(newFlightData.ft_price)<1000000))
      throw "not proper first class price , should be an integer between 1 and 1000000 "

      newFlightData.ec_price=xss(newFlightData.ec_price)
      if(!newFlightData.ec_price)
      throw "economy class price not provided";
   
      if(typeof(newFlightData.ec_price)!=="string")
      throw 'economy class price is not a string';
      if(newFlightData.ec_price.trim().length===0)
      throw "economy class price cant be empty or all white spaces";
   
      newFlightData.ec_price=newFlightData.ec_price.trim() 
      if(!(Number.isInteger(Number(newFlightData.ec_price)) && Number(newFlightData.ec_price) > 1 && Number(newFlightData.ec_price)<1000000))
      throw "not proper economy class price , should be an integer between 1 and 1000000 "


      newFlightData.bs_price=xss(newFlightData.bs_price)
      if(!newFlightData.bs_price)
      throw "business class price not provided";
   
      if(typeof(newFlightData.bs_price)!=="string")
      throw 'business class price is not a string';
      if(newFlightData.bs_price.trim().length===0)
      throw "business class price cant be empty or all white spaces";
   
      newFlightData.bs_price=newFlightData.bs_price.trim() 
      if(!(Number.isInteger(Number(newFlightData.bs_price)) && Number(newFlightData.bs_price) > 1 && Number(newFlightData.bs_price)<1000000))
      throw "not proper business class price , should be an integer between 1 and 1000000 "


      if(Number(newFlightData.ft_seats) > 0){
        let myArray = newFlightData.ft_food_options.split(",");
        
        myArray=await helper.checkifproperfoodchoices(myArray)
        const addClassRes = await classes.createClass(addFlightRes._id, "first", Number(newFlightData.ft_seats), 
        Number(xss(newFlightData.ft_price)), myArray);
      }

      if(Number(newFlightData.bs_seats) > 0){
        let myArray = newFlightData.bs_food_options.split(",");
        
        myArray=await helper.checkifproperfoodchoices(myArray)
        
        const addClassRes = await classes.createClass(addFlightRes._id, "business", Number(newFlightData.bs_seats), 
        Number(xss(newFlightData.bs_price)), myArray);
      }

      if(Number(newFlightData.ec_seats) > 0){
        let myArray = newFlightData.ec_food_options.split(",");
        myArray=await helper.checkifproperfoodchoices(myArray)
        const addClassRes = await classes.createClass(addFlightRes._id, "economy", Number(newFlightData.ec_seats), 
        Number(xss(newFlightData.ec_price)), myArray);
      }

      return res.redirect("/admin");
    } catch (e) {haserror=true;error=e;
      res.status(400).render("newFlight", { title: "Add Flight",haserror:haserror,error:error});
    }
  });
  
  
router.route("/admin/editflight/:id").get(async (req, res) => {
    //code here for GET
    let fid=xss(req.params.id);
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
  req.params.id=xss(req.params.id).trim()
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
     const newflightcode = xss(req.body.flightcodeInput)
     const newdeparture = xss(req.body.departureInput)
     const newarrival= xss(req.body.arrivalInput)
     const newdepartureDate=xss(req.body.departureDateInput)
     const newdeparturetime =xss(req.body.departimeInput)
     const newarrivalDate= xss(req.body.arrivalDateInput)
     const newarrivaltime=xss(req.body.arrTimeInput)
   
     const newmiles=xss(req.body.milesInput)
     const fid=xss(req.params.id)
     
 
   try{
   const newflight = await flightData.updateFlight(fid,newflightcode,newdeparture,newarrival,newdepartureDate,newdeparturetime,newarrivalDate,newarrivaltime,newmiles)
   return res.redirect('/admin')
   
}catch(e){ 
  return res.redirect('/admin')
}
});


router.route("/admin/deleteflight/:id").get(async (req, res) => {
  try {
    let fid = xss(req.params.id);
  

    let isLoggedIn;
    if(req.session.admin) isLoggedIn = true;
    else isLoggedIn = false;

    let flightDeleted = await flightData.removeFlight(fid);
    //console.log(flightDeleted);
    let bookingsDeleted = await bookingsData.removeAllBookingHavingFid(fid);
    //console.log(bookingsDeleted);
    
    res.redirect('/admin');
  } catch (error) {
    
    res.redirect('admin');
  }
  
});


module.exports = router;