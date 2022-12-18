const express = require('express');
const router = express.Router();
const data = require('../data');
const flightsData = data.flights;
const classes = require('../data/class');
const bookingCollection = require('../data/bookingCollection');
const travelerData = require('../data/travelers');
const userCollection = require('../data/usersCollection');
const path = require('path');
const emaildata=require('../data/email');
const pdfCreate = require('../data/pdfCreation');
const { travelers } = require('../data');
const helpers = require('../helpers');
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const xss = require('xss');

//route for getting flights from passed parameters from form on the home page

router.route("/searchflights").post(async (req, res) => {
    try{

      //error cheking
     
      let flightInfo=req.body;
      let departure=xss(flightInfo.depart_airport);
      let arrival=xss(flightInfo.arrival_airport);
      let date=xss(flightInfo.date);
      let NoOfPass=xss(flightInfo.passengers);
      let f_class=xss(flightInfo.class);
      if(!departure) throw 'No departure passed!';
      if(!arrival) throw 'No arrival passed!';
      if(!date) throw 'No date passed';
      if(!NoOfPass) throw 'No passengers passed!';
      if(!f_class) throw 'No flight class passed!';
      departure=await helper.checkifproperdeparr(departure)
      arrival=await helper.checkifproperdeparr(arrival)
      date=await helper.checkifproperDate(date)
      f_class=await helper.checkifproperclasstype(f_class)
      if(isNaN(NoOfPass)) throw 'Number of passengers must be valid Number';
      NoOfPass=Number(NoOfPass);
      if(NoOfPass<1 || NoOfPass>5) throw 'Number of passengers must be between 1 to 5';
      var today = new Date();
      var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      if(date<today_date) throw 'you can not add date which is lower than today';

      let isLoggedIn;
      if(req.session.user) isLoggedIn = true;
      else isLoggedIn = false;

      //error handling done
      
      let result=await flightsData.searchFlightsResult(departure,arrival,date,NoOfPass,f_class);
      
      if(result.length==0){
        //res.status(400).render('error',{error:'No result found for this properties' ,title:'No result Found'}, );
        res.render('searchFlights',{flights : result,title:'searchFlights', isLoggedIn: isLoggedIn,noflights:true});
      }
      else{
        await result.forEach(element => {
          element['NoOfPass']=NoOfPass;
          element['class']=f_class;
        });
        req.session.info = {class : f_class, noOfPass : NoOfPass.toString()};
        
        let isLoggedIn;
        if(req.session.user) isLoggedIn = true;
        else isLoggedIn = false;
        // req.session.previousURL = {previousURL:"/searchflights"};
        res.render('searchFlights',{flights : result,title:'searchFlights', isLoggedIn: isLoggedIn,noflights:false});
      } 
    }catch(e){
      res.status(400).render('error',{error:e ,title:'error'}, );
    }
});

router.route("/searchflights/flightdetails/:id").get(async (req, res) => {
  //code here for GET
  // let fid=req.params.id;
  // let f_class=req.params.class;
  // let NoOfPass=req.params.NoOfPass;
  let err;
  let haserror=false;
  let fid=xss(req.params.id);
  let f_class=req.session.info.class;
  let NoOfPass=req.session.info.noOfPass;
  let isLoggedIn;
  try{
  if(!fid) {
    throw "no flight id is given"
  }
  if(typeof(fid)!=="string")
  {throw "Flight Id is not a string" } 
  fid=fid.trim()
  if(fid.length===0)
  {throw "No Flight Id is given or is all white spaces"}

  fid=fid.trim()

  var sol=await flightsData.getallflightdetailsforflightdetailspage(fid,f_class)
  
  sol["id1"]=fid
  sol["f_class"]=f_class
  sol["NoOfPass"]=NoOfPass

  
  req.session.previousURL = {previousURL:`/searchflights/flightdetails/${fid}/book`};
  if(req.session.user) isLoggedIn = true;
  else isLoggedIn = false;
  return res.status(200).render('flightdetails', { solution1: sol,title: "Flight Found" ,isLoggedIn : isLoggedIn, haserror:haserror, error:err});

} catch(e){err=e;haserror=true;
  return res.status(400).render('flightdetails', { solution1: sol,title: "Flight Found" ,isLoggedIn : isLoggedIn, haserror:haserror, error:err});
}
  
    
});

router.route("/searchflights/flightdetails/:id/book").get(async(req,res)=>{
  let flightId = xss(req.params.id);
    
  let flightClass = req.session.info.class;
  
  let NoOfPass = req.session.info.noOfPass;
  let food;
  let isLoggedIn;
  try {
    
   
    
    if(!flightId) throw 'Flight Id is not provided.';
    if(!flightClass) throw 'Flight Class is not provided.';
    if(!NoOfPass) throw 'Number of passengers is not provided.';
    if(typeof flightId !== 'string') throw 'FlightId is not a string.';
    if(typeof flightClass !== 'string') throw 'Flight Class is not a string.';
    if(typeof NoOfPass !== 'string') throw 'Number of passengers is not a string.';
    if(flightId.trim().length===0)
    throw 'flight id cannot be empty or all white spaces';
    flightId=flightId.trim();
    if(!ObjectId.isValid(flightId))
    throw `id is not valid`;
    flightClass = flightClass.trim();
    NoOfPass = NoOfPass.trim();
    if(NoOfPass.trim().length===0)
    throw 'Number of Passengers cannot be empty or all white spaces';
    flightClass = await helpers.checkifproperclasstype(flightClass);
    NoOfPass = await helpers.checkifproperNoOfPass(NoOfPass);
    //console.log(flightClass);
    
    if(req.session.user) isLoggedIn = true;
    else isLoggedIn = false;
    
    food = await classes.getFoodChoiceFromClass(flightId,flightClass);
    
    // console.log(food);
    // req.session.previousURL = {previousURL:`/searchflights/flightdetails/${flightId}/book`};
    res.render('bookflight', {title : "Book Flight", noOfPass : NoOfPass, choice : food, flightId : flightId, flightClass : flightClass, isLoggedIn : isLoggedIn, hasError : false});
  } catch (e) {
    
    res.status(400).render('error',{title : "Error",error : e});
  }

});

router.route("/searchflights/flightdetails/:id/book/success").post(async(req,res) => {
  let data = req.body;
  let flightId = xss(req.params.id);
  let flightClass = req.session.info.class;
  let NoOfPass = req.session.info.noOfPass;

  try {

    if(!flightId) throw 'Flight Id is not provided.';
    if(!flightClass) throw 'Flight Class is not provided.';
    if(!NoOfPass) throw 'Number of passengers is not provided.';
    if(typeof flightId !== 'string') throw 'FlightId is not a string.';
    if(typeof flightClass !== 'string') throw 'Flight Class is not a string.';
    if(typeof NoOfPass !== 'string') throw 'Number of passengers is not a string.';
    if(flightId.trim().length===0)
    throw 'flight id cannot be empty or all white spaces';
    flightId=flightId.trim();
    if(!ObjectId.isValid(flightId))
    throw `id is not valid`;
    flightClass = flightClass.trim();
    NoOfPass = NoOfPass.trim();
    if(NoOfPass.trim().length===0)
    throw 'Number of Passengers cannot be empty or all white spaces';
    flightClass = await helpers.checkifproperclasstype(flightClass);
    NoOfPass = await helpers.checkifproperNoOfPass(NoOfPass);
    let keys = Object.keys(data);
    let arrayObj = [];
    for(let i = 0; i < keys.length; i++)
    {
        let value = data[keys[i]];
        let key = keys[i].substring(0, keys[i].length - 1);
        let index = parseInt(keys[i][keys[i].length - 1]) - 1;
        arrayObj[index] = arrayObj[index] || {};
        arrayObj[index][key] = value; 
    }
    let key = [];
    for(let i = 0; i < keys.length; i++)
    {
        key.push(keys[i].substring(0, keys[i].length - 1));
    }
    let userIdByEmail = await userCollection.getUserByEmail(req.session.user.email);
    let userID =  userIdByEmail._id.toString();
    let bookingData = await bookingCollection.createBooking(flightId,userID);
    for(let i = 0; i < arrayObj.length; i++)
    {
        let obj = arrayObj[i];
        let firstname, lastname, passport, birthdate, gender, email, mobile, foodchoices;
        for(let j = 0; j < key.length; j++)
        {
            if(key[j] == 'firstname') firstname = arrayObj[i][key[j]];
            if(key[j] == 'lastname') lastname = arrayObj[i][key[j]];
            if(key[j] == 'passport') passport = arrayObj[i][key[j]];
            if(key[j] == 'birthdate') birthdate = arrayObj[i][key[j]];
            if(key[j] == 'gender') gender = arrayObj[i][key[j]];
            if(key[j] == 'email') email = arrayObj[i][key[j]];
            if(key[j] == 'mobile') mobile = arrayObj[i][key[j]];
            if(key[j] == 'foodchoices') foodchoices = arrayObj[i][key[j]];            
        }

        firstname = await helpers.checkifproperfirstname(firstname);
        lastname = await helpers.checkifproperlastname(lastname);
        passport = await helpers.checkifproperpassport(passport);
        birthdate = await helpers.checkifproperbirthdate(birthdate);
        gender = await helpers.checkifpropergender(gender);
        email = await helpers.checkifproperemail(email);
        mobile = await helpers.checkifproperphonenumber(mobile);
        foodchoices = await helpers.checkifproperchoiceoffood(foodchoices);

        let updatedBooking = await travelerData.createTraveler(bookingData._id,firstname,lastname,passport,birthdate,gender,email,mobile,flightClass,foodchoices);
        // console.log(updatedBooking);
    }
    let isLoggedIn;
    if(req.session.user) isLoggedIn = true;
    else isLoggedIn = false;
    let updatedClassCapacity = await classes.updateClassCapacity(flightId,flightClass,NoOfPass);
    let enterBookingHistory = await userCollection.updateBookingHistory(userID,bookingData._id);
    let getBookings = await bookingCollection.getBookingById(bookingData._id);
    let flightClassPrice = await classes.getFlightClassPrice(flightId,flightClass);
    let totalPrice = NoOfPass*flightClassPrice;
    var flightDetails=await flightsData.getallflightdetailsforflightdetailspage(flightId,flightClass);
    // console.log(getBookings.travelers);
    // req.session.previousURL = {previousURL:`/searchflights/flightdetails/${flightId}/book/success`};
    req.session.bookingID = {bookingID : bookingData._id};
    res.render('success',{title:"Success",isLoggedIn: isLoggedIn, travelers : getBookings.travelers, sr : getBookings.travelers.length, totalPrice : totalPrice, flightDetails : flightDetails});
    
  } catch (e) {
    res.status(400).render('error',{title : "Error",error : e});
  }
  
});


router.route("/searchflights/flightdetails/:id/book/success/emailconfirmation").get(async (req, res) => {
  let eror;
let bookid= req.session.bookingID.bookingID
bookid=bookid.toString()

try{
await emaildata.myemail(bookid)
}catch(e){error=e}
res.redirect('/')

});

router.route("/searchflights/flightdetails/:id/book/success").get(async (req, res) => {
  
  try{
    let bookingId =req.session.bookingID.bookingID;
    bookingId = bookingId.toString();
    let getBooking = await bookingCollection.getBookingById(bookingId);
    let flightDetails = await flightsData.getFlightById(getBooking.flightId);
    let travelersDetails = getBooking.travelers;
    let NoOfPass =req.session.info.noOfPass;
    // let flightId = req.params.id;
    let flightClass = req.session.info.class;
    flightClass = await helpers.checkifproperclasstype(flightClass);
    NoOfPass = await helpers.checkifproperNoOfPass(NoOfPass);
    let flightClassPrice = await classes.getFlightClassPrice(getBooking.flightId,flightClass);
    let totalPrice = NoOfPass*flightClassPrice;
    let isLoggedIn;
    if(req.session.user) isLoggedIn = true;
    else isLoggedIn = false;
    // var flightDetails=await flightsData.getallflightdetailsforflightdetailspage(flightId,classType);

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition' : 'attachment;filename=ticket.pdf',
    });
    await pdfCreate.createInvoice(flightDetails,travelersDetails,totalPrice,"ticket.pdf",(chunk)=> stream.write(chunk),()=>stream.end());
    // res.render('success',{isLoggedIn: isLoggedIn, travelers : getBooking.travelers, sr : getBooking.travelers.length, totalPrice : totalPrice, flightDetails : flightDetails});
    // res.redirect('/');
  
  }catch(e){
    res.status(400).render('error',{title : "Error",error : e});
  }
  
  })


module.exports = router;

