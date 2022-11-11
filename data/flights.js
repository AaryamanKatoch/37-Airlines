const mongoCollections = require('../config/mongoCollections');

const flights = mongoCollections.flights;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');




const createFlight = async (
  flightCode,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  duration,
  miles,

) => {
  
  const flightcollection = await flights();
  let flight1 = {
  flightCode:flightCode,
  departure:departure,
  arrival:arrival,
  departureTime:departureTime,
  arrivalTime:arrivalTime,
  duration:duration,
  miles:miles,
  flightClass:[],
  bookedSeats:[],
  reviews:[]
  }
  const insertInfo = await flightcollection.insertOne(flight1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add flight';
  
     const newId = insertInfo.insertedId.toString();
  
      const flight = await getFlightById(newId);
     
       flight._id=flight._id.toString()
       return flight;};

const getAllFlights = async () => {    const flightCollection = await flights();

  const arr = await flightCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;};

const getFlightById = async (flightId) => {  if(!flightId)
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
 /////////
 for(i=0;i<flightbyid.reviews.length;i++){
  flightbyid.reviews[i]._id=flightbyid.reviews[i]._id.toString()
 }
 return flightbyid;};

const removeFlight = async (flightId) => {if(!flightId)
  throw `no id is given`;
  if(typeof(flightId)!=="string")
  throw `type of id is not a string`;
  if(flightId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  flightId=flightId.trim();
  if(!ObjectId.isValid(flightId))
  throw `id is not valid`;
  const flightCollection =await flights();
  var deletename= await getFlightById(flightId);
  
  const deletedflight = await flightCollection.deleteOne({_id: ObjectId(flightId)});

  if (deletedflight.deletedCount === 0) {
    throw `Could not delete flight with id of ${flightId}`;
  }

  return (`${deletename.flightId} has been successfully deleted! `);};

const updateFlight = async (
  flightCode,
  flightId,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  duration,
  miles,
  
) => {


  
  
  ///
  const flightCollection = await flights();
  let updatedflight = {
    flightCode:flightCode,
    departure:departure,
    arrival:arrival,
    departureTime:departureTime,
    arrivalTime:arrivalTime,
    duration:duration,
    miles:miles,
    
  }
  const updatedInfo = await flightCollection.updateOne({_id: ObjectId(id)},
  {$set: updatedflight}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update flight successfully';
  
}
return await getFlightById(id)

};




module.exports = {createFlight,
  getAllFlights,
  getFlightById,
  removeFlight,
  updateFlight
};
