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


module.exports = router;

