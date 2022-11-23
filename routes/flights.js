const express = require('express');
const router = express.Router();
const data = require('../data');
const flightsData = data.flights;
const path = require('path');

router.route("/searchflights").post(async (req, res) => {
    try{
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
      if(departure.trim().length==0) throw 'departure can not be empty string';
      if(arrival.trim().length==0) throw 'arrival can not be empty string';
      if(!typeof departure=='string') throw 'departure must be valid string';
      if(!typeof arrival=='string') throw 'arrival must be valid string';
      NoOfPass=Number(NoOfPass);
      if(isNaN(NoOfPass)) throw 'Number of passengers must be valid Number';
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




module.exports = router;

