const mongoCollections = require('../config/mongoCollections');

const flights = mongoCollections.flights;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const moment = require('moment');


//added date in create and update flight
const createFlight = async (
  flightCode,
  departure,
  arrival,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  duration,
  miles
) => {

  flightCode=await helper.checkifproperflightcode(flightCode)
  departure=await helper.checkifproperdeparr(departure)
  arrival=await helper.checkifproperdeparr(arrival)
  departureDate=await helper.checkifproperDate(departureDate)
  departureTime=await helper.checkifproperarrdepttime(departureTime)
  arrivalDate=await helper.checkifproperDate(arrivalDate)
  arrivalTime=await helper.checkifproperarrdepttime(arrivalTime)
  duration=await helper.checkifproperduration(duration)
  await helper.checkifpropermiles(miles)
  miles=miles.trim()

  const flightcollection = await flights();
  let flight1 = {
    flightCode: flightCode,
    departure: departure,
    arrival: arrival,
    departureDate: departureDate,
    departureTime: departureTime,
    arrivalDate: arrivalDate,
    arrivalTime: arrivalTime,
    duration: duration,
    miles: miles,
    flightClass: [],
    bookedSeats: [],
    reviews: []
  }

  const insertInfo = await flightcollection.insertOne(flight1);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add flight';

  const newId = insertInfo.insertedId.toString();

  const flight = await getFlightById(newId);

  flight._id = flight._id.toString();

  return flight;
};

const getAllFlights = async () => {    
  const flightCollection = await flights();
  const arr = await flightCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;
};

const getFlightById = async (flightId) => {  
  if(!flightId)
  throw `no id is given`;
  if(typeof(flightId)!=="string")
  throw `type of id is not a string`;
  if(flightId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  flightId=flightId.trim();
  if(!ObjectId.isValid(flightId))
  throw `id is not valid`;
 const flightCollection =await flights();

 const flightbyid= await flightCollection.findOne({_id:ObjectId(flightId)});
 if(flightbyid===null) 
 throw `no flight found with that id`;
 flightbyid._id=flightbyid._id.toString()
 for(i=0;i<flightbyid.reviews.length;i++){
  flightbyid.reviews[i]._id=flightbyid.reviews[i]._id.toString()
 }
 return flightbyid;
};

const removeFlight = async (flightId) => {
  if(!flightId) throw `no id is given`;
  if(typeof(flightId)!=="string") throw `type of id is not a string`;
  if(flightId.trim().length===0) throw 'id cannot be empty or all white spaces';

  flightId = flightId.trim();
  if(!ObjectId.isValid(flightId)) throw `id is not valid`;

  const flightCollection = await flights();
  var deletename = await getFlightById(flightId);
  
  const deletedflight = await flightCollection.deleteOne({_id: ObjectId(flightId)});

  if (deletedflight.deletedCount === 0) {
    throw `Could not delete flight with id of ${flightId}`;
  }

  return (`${deletename.flightId} has been successfully deleted! `);

};

const updateFlight = async (
  id,
  flightCode,
  departure,
  arrival,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  duration,
  miles
  
) => {

  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;

  flightCode=await helper.checkifproperflightcode(flightCode)
  departure=await helper.checkifproperdeparr(departure)
  arrival=await helper.checkifproperdeparr(arrival)
  departureDate=await helper.checkifproperDate(departureDate)
  departureTime=await helper.checkifproperarrdepttime(departureTime)
  arrivalDate=await helper.checkifproperDate(arrivalDate)
  arrivalTime=await helper.checkifproperarrdepttime(arrivalTime)
  duration=await helper.checkifproperduration(duration)
  await helper.checkifpropermiles(miles)
  miles=miles.trim()
  //flightCode=await helper.checkifproperflightcode(flightCode)
  //departure=await helper.checkifproperdeparr(departure)
  //arrival=await helper.checkifproperdeparr(arrival)
  //departureTime=await helper.checkifproperarrdepttime(departureTime)
  //arrivalTime=await helper.checkifproperarrdepttime(arrivalTime)
  //duration=await helper.checkifproperduration(duration)
  //miles=miles.trim()
  //await helper.checkifpropermiles(miles)
  


  ///
  const flightCollection = await flights();
  let updatedflight = {
    flightCode:flightCode,
    departure:departure,
    arrival:arrival,
    departureDate:departureDate,
    departureTime:departureTime,
    arrivalDate:arrivalDate,
    arrivalTime:arrivalTime,
    duration:duration,
    miles:miles
  }
  const updatedInfo = await flightCollection.updateOne({_id: ObjectId(id)},
  {$set: updatedflight}
);
//if (updatedInfo.modifiedCount === 0) {
 // throw 'could not update flight successfully';
  
//}
return await getFlightById(id);

};

/*  function for searching flights from passed departure , arrival , date , number of passengers and
 flight class details   */

const searchFlightsResult = async ( 
  departure,
  arrival,
  date,
  NoOfPass,
  f_class
) => {
  
  //error cheking 

  // if(!departure) throw 'No departure passed!';
  // if(!arrival) throw 'No arrival passed!';
  // if(!date) throw 'No date passed';
  if(!NoOfPass) throw 'No passengers passed!';
  // if(!f_class) throw 'No flight class passed!';

  departure=await helper.checkifproperdeparr(departure)
  arrival=await helper.checkifproperdeparr(arrival)
  date=await helper.checkifproperDate(date)
  f_class=await helper.checkifproperclasstype(f_class)
  

  // if(departure.trim().length==0) throw 'departure can not be empty string';
  // if(arrival.trim().length==0) throw 'arrival can not be empty string';
  // if(date.trim().length==0) throw 'date can not be empty string';
  // if(f_class.trim().length==0) throw 'flight class can not be empty string';

  // if(!typeof departure=='string') throw 'departure must be valid string';
  // if(!typeof arrival=='string') throw 'arrival must be valid string';
  // if(!typeof date=='string') throw 'date must be valid string';
  // if(!typeof f_class=='string') throw 'flight class must be valid string';
  // if(isNaN(NoOfPass)) throw 'Number of passengers must be valid Number';
  // NoOfPass=Number(NoOfPass);

  
  //error cheking done

  const flightCollection =await flights();

  //creating date array for next week of selected date

  let date_arr=[];  
  date_arr.push(date);
  date=new Date(date);
  for (let i = 1; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    date=date.toISOString();
    date_arr.push(date.split('T')[0]);
    date=new Date(date) 
  }

  //getting flights based on dates and other parameters 

  const flightsList = await flightCollection.find({'departure':departure,'arrival':arrival,'departureDate':{ $in: date_arr }}).toArray();
  if(flightsList==null){
    return flightsList;
  }
 
  let f_flightList=[];
  flightsList.forEach(element => {
    let add_flag=false;
    let temp=element.flightClass;
    temp.forEach(element => {
      if(element.classType==f_class){
        if(element.classCapacity>=NoOfPass){
          add_flag=true;
        }
      }
    });
    if(add_flag){
      f_flightList.push(element);
    }
  });
  return f_flightList;
}

async function getallflightdetailsforflightdetailspage(id,fclass){
  
  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;

 if(!fclass)
 throw 'no flight class is provided'
 if(typeof(fclass)!=="string")
 throw `type of flight class is not a string`;
 if(fclass.trim().length===0)
 throw 'flight class cannot be empty or all white spaces';
 fclass=fclass.trim();
 fclass=await helper.checkifproperclasstype(fclass)
 let resclass={}

  const flightCollection=await flights()
  flightdetails=await getFlightById(id)

  const allflights = await flightCollection.find({}).toArray();
  

  for(i=0;i<allflights.length;i++){
    curflight=allflights[i]
    if(curflight._id==id){
    for(j=0;j<curflight.flightClass.length;j++){
      
      if(fclass==curflight.flightClass[j].classType){
        resclass=curflight.flightClass[j]
      }
    }
  }}

  let myflight={
  flightCode:flightdetails.flightCode,
  departure:flightdetails.departure,
  arrival:flightdetails.arrival,
  departureTime:flightdetails.departureTime,
  arrivalTime:flightdetails.arrivalTime,
  duration:flightdetails.duration,
  miles:flightdetails.miles,
  flightClass:resclass
}


return myflight
}
  
// async function main(){
//   try{
//     let result=await searchFlightsResult('New York','California','2022-12-10',2,'economy');
//     console.log(result);
//   }catch(e){
//     console.log(e);
//   }
//   console.log('done');
//   process.exit();
// }

// main();

module.exports = {
  getallflightdetailsforflightdetailspage,
  createFlight,
  getAllFlights,
  getFlightById,
  removeFlight,
  updateFlight,
  searchFlightsResult
};
