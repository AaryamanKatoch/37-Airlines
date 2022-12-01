const express = require('express');
const router = express.Router();
const data = require('../data');
const flightsData = data.flights;
const classes = require('../data/class');
const bookingCollection = require('../data/bookingCollection');
const travelerData = require('../data/travelers');
const path = require('path');

//route for getting flights from passed parameters from form on the home page

router.route("/searchflights").post(async (req, res) => {
    try{

      //error cheking

      let flightInfo=req.body;
      let departure=flightInfo.depart_airport;
      let arrival=flightInfo.arrival_airport;
      let date=flightInfo.date;
      let NoOfPass=flightInfo.passengers;
      let f_class=flightInfo.class;
      if(!departure) throw 'No departure passed!';
      if(!arrival) throw 'No arrival passed!';
      if(!date) throw 'No date passed';
      if(!NoOfPass) throw 'No passengers passed!';
      if(!f_class) throw 'No flight class passed!';
      if(departure.trim().length==0) throw 'departure can not be empty string';
      if(arrival.trim().length==0) throw 'arrival can not be empty string';
      if(date.trim().length==0) throw 'date can not be empty string';
      if(f_class.trim().length==0) throw 'flight class can not be empty string';
      if(!typeof date=='string') throw 'date must be valid string';
      if(!typeof f_class=='string') throw 'flight class must be valid string';
      if(isNaN(NoOfPass)) throw 'Number of passengers must be valid Number';
      NoOfPass=Number(NoOfPass);

      //error handling done

      let result=await flightsData.searchFlightsResult(departure,arrival,date,NoOfPass,f_class);
      if(result.length==0){
        res.status(400).render('error',{error:'No result found for this properties' ,title:'No result Found'}, );
      }
      else{
        await result.forEach(element => {
          element['NoOfPass']=NoOfPass;
          element['class']=f_class;
        });
        res.render('searchFlights',{flights : result,title:'searchFlights','class':f_class,'NoOfPass':NoOfPass});
      } 
    }catch(e){
      res.status(400).render('error',{error:e ,title:'ridham error'}, );
    }
});

router.route("/searchflights/:id&:class&:NoOfPass").get(async (req, res) => {
  //code here for GET
  let fid=req.params.id;
  let f_class=req.params.class;
  let NoOfPass=req.params.NoOfPass;
  
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
  var sol=await flightsData.getallflightdetailsforflightdetailspage(fid,f_class)
  sol["id1"]=fid
  sol["f_class"]=f_class
  sol["NoOfPass"]=NoOfPass
} catch(e){;res.status(404).render("error",{class:"error",title:"Error", error: "No Flight found with that id"});return}

res.render('flightdetails', { solution1: sol,title: "Flight Found" });
});

router.route("/searchflights/book/:id&:class&:NoOfPass").get(async(req,res)=>{
  try {
    let flightId = req.params.id;
    let flightClass = req.params.class;
    let NoOfPass = req.params.NoOfPass;
    
    if(!flightId) throw 'Flight Id is not provided.';
    if(!flightClass) throw 'Flight Class is not provided.';
    if(!NoOfPass) throw 'Number of passengers is not provided.';
    flightId = flightId.trim();
    //console.log(flightClass);
    let food = await classes.getFoodChoiceFromClass(flightId,flightClass);
    console.log(food);
    res.render('bookflight', {title : "Book Flight", noOfPass : NoOfPass, choice : food, flightId : flightId, flightClass : flightClass});
  } catch (e) {
    res.render('error',{error : e, title : 'Error'});
  }

});

router.route("/searchflights/book/:id&:class&:NoOfPass/success").post(async(req,res) => {
  let data = req.body;
  let flightId = req.params.id;
  let classType = req.params.class;  
  let NoOfPass = req.params.NoOfPass;
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
  let bookingData = await bookingCollection.createBooking(flightId,'6379595b21896b817c8fc3c6');
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
      let updatedBooking = await travelerData.createTraveler(bookingData._id,firstname,lastname,passport,"1",birthdate,gender,email,mobile,classType,foodchoices);
      console.log(updatedBooking);
  }
  let updatedClassCapacity = await classes.updateClassCapacity(flightId,classType,NoOfPass);
   res.render('success');
});




module.exports = router;

