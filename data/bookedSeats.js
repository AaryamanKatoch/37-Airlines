const mongoCollections = require('../config/mongoCollections');

const {ObjectId} = require('mongodb');

const {flights}=require('../config/mongoCollections');


const {getFlightById }= require("./flights")
const flightData = require('../data/flights.js');
const helper=require('../helpers')


const createBookedSeats = async (
  flightId,
  travelerId,
  classtype
) => {
  
 
  classtype=helper.checkifproperclasstype(classtype)
  const bookedId=ObjectId();
  const flightCollection= await flights()
 
  
  let booked1 = {
  travelerId:travelerId,
  classtype:classtype
  }


  
  const updatedseats = { _id: bookedId, ...booked1 };
 


  try{
  const updatedInfo= await flightCollection.updateOne({ _id: ObjectId(flightId) }, { $push: {  bookedSeats: updatedseats } });
  if (updatedInfo.modifiedCount === 0) 
    throw "could not add booked seats";
  }catch(e){throw "flight not found"}
  const flight1=flightData.getFlightById(flightId)
  return flight1
}




const getAllBookedSeats = async (flightId) => {
  if(!flightId)
  throw `no id is given`;
  if(typeof(flightId)!=="string")
  throw `type of id is not a string`;
  if(flightId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  flightId=flightId.trim();
  if(!ObjectId.isValid(flightId))
  throw `id is not valid`;
  flightId=flightId.trim()
 
  const flight1 = await flightData.getFlightById(flightId);

 return flight1.bookedSeats
};

const getBookedSeats = async (bookedId) => {
  
  if(!bookedId)
  throw `no id is given`;
  if(typeof(bookedId)!=="string")
  throw `type of id is not a string`;
  if(bookedId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookedId=bookedId.trim();
  if(!ObjectId.isValid(bookedId))
  throw `id is not valid`;
  bookedId=bookedId.trim()

const flightCollection=await flights()

const flightList = await flightCollection.find({}).toArray();
let found = false;
let fbooked = {};
for (let i = 0; i < flightList.length; i++) {
    const currentflight = flightList[i];
    for (let j = 0; j < currentflight.bookedSeats.length; j++) {
        if (currentflight.bookedSeats[j]._id.toString() == bookedId) {
            found= true;
            fbooked = currentflight.bookedSeats[j];
        }
    }
}
if (!found) throw 'no bookings with that id';
fbooked._id=fbooked._id.toString()
return fbooked;
};



const removeBookedSeats = async (bookedId) => {



  if(!bookedId)
  throw `no id is given`;
  if(typeof(bookedId)!=="string")
  throw `type of id is not a string`;
  if(bookedId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookedId=bookedId.trim();
  if(!ObjectId.isValid(bookedId))
  throw `id is not valid`;
  bookedId=bookedId.trim()
  
  const flightCollection = await flights();
  const allflights = await flightCollection.find({}).toArray();
  let bookingFound = false;
  let flightId = "";
  let newallflights = [];
  let curflight = {};
  for (let i = 0; i < allflights.length; i++) {
      curflight = allflights[i];
      let oldbookingList = curflight.bookedSeats;     
for (let j = 0; j < oldbookingList.length; j++) {
          if (oldbookingList[j]._id.toString() == bookedId) {



  bookingFound = true;
  flightId = oldbookingList[j]._id;
              for (let k = 0; k < oldbookingList.length; k++) {
          if (oldbookingList[k]._id.toString() == bookedId) {
    continue;
    

                  }
    newallflights.push(oldbookingList[k]);
              }
          }
    if (bookingFound) break;
      }
      curflight.bookedSeats = newallflights;
      if (bookingFound) break;
  }
  if (!bookingFound) {
      throw `could not delete booking with id of ${bookingId}`;
  }

  const newbooking = {};
  newbooking.bookedSeats = curflight.bookedSeats;

  await flightCollection.updateOne({_id: curflight._id}, {$set: {bookedSeats : curflight.bookedSeats}});
  return("deleted bookedseat")

};


  


module.exports = {createBookedSeats,getAllBookedSeats,getBookedSeats,removeBookedSeats};
