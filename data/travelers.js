const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const {ObjectId} = require('mongodb');

const {bookings}=require('../config/mongoCollections');

//const { getFlightById } =require('./flights')

const bookingData = require('../data/bookingCollection');

//const {getFlightById} = require('./flight');



const createTraveler = async (
  bookingId,
  firstName,
  lastName,
  passportNumber,
  dateOfBirth,
  gender,
  email,
  phoneNumber,
  bookedClass,
  food
) => {
  
 
  
  const travelerId=ObjectId();
  const bookingCollection= await bookings()
 
  
  let traveler1 = {
    firstName:firstName,
    lastName:lastName,
    passportNumber:passportNumber,
    dateOfBirth:dateOfBirth,
    gender:gender,
    email:email,
    phoneNumber:phoneNumber,
    bookedClass:bookedClass,
    food:food
  }
 // reviewcollec=await reviews()

  
  const updatedtraveler = { _id: travelerId, ...traveler1 };
  //updatedReviews._id=updatedReviews._id.toString();


  try{
  const updatedInfo= await bookingCollection.updateOne({ _id: ObjectId(bookingId) }, { $push: { travelers: updatedtraveler } });
  if (updatedInfo.modifiedCount === 0) 
    throw "could not add traveller";
  }catch(e){throw "booking not found"}
const booking1 = bookingData.getBookingById(bookingId)
return booking1
}

const getAllTravelers = async (bookingId) => {
  if(!bookingId)
  throw `no id is given`;
  if(typeof(bookingId)!=="string")
  throw `type of id is not a string`;
  if(bookingId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookingId=bookingId.trim();
  if(!ObjectId.isValid(bookingId))
  throw `id is not valid`;
  bookingId=bookingId.trim()
 
  const booking1 = await bookingData.getBookingById(bookingId);
// movie1.reviews._id=movie1.reviews._id.toString()
 return booking1.travelers
};

const getTraveler = async (travelerId) => {
  
  if(!travelerId)
  throw `no id is given`;
  if(typeof(travelerId)!=="string")
  throw `type of id is not a string`;
  if(travelerId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  travelerId=travelerId.trim();
  if(!ObjectId.isValid(travelerId))
  throw `id is not valid`;
  travelerId=travelerId.trim()
const bookingCollection=await bookings()

const bookingList = await bookingCollection.find({}).toArray();
let found = false;
let ftraveler = {};
for (let i = 0; i < bookingList.length; i++) {
    const currentbooking = bookingList[i];
    
    for (let j = 0; j < currentbooking.travelers.length; j++) {
        if (currentbooking.travelers[j]._id.toString() == travelerId) {
            found= true;
            ftraveler = currentbooking.travelers[j];
        }
    }
}
if (!found) throw 'no booking with that id';
ftraveler._id=ftraveler._id.toString()
return ftraveler;
};



const removeTraveler = async (travelerId) => {
  const bookingCollection = await bookings();
  const allbookings = await bookingCollection.find({}).toArray();
  let travelerFound = false;
  let bookingId = "";
  let newallbookings = [];
  let curbooking = {};
  for (let i = 0; i < allbookings.length; i++) {
      curbooking = allbookings[i];
      let oldtravelerList = curbooking.travelers;     
for (let j = 0; j < oldtravelerList.length; j++) {
          if (oldtravelerList[j]._id.toString() == travelerId) {



  travelerFound = true;
  bookingId = oldtravelerList[j]._id;
              for (let k = 0; k < oldtravelerList.length; k++) {
          if (oldtravelerList[k]._id.toString() == bookingId) {
    continue;
    

                  }
    newallbookings.push(oldtravelerList[k]);
              }
          }
    if (travelerFound) break;
      }
      curbooking.travelers = newallbookings;
      if (travelerFound) break;
  }
  if (!travelerFound) {
      throw `could not delete traveler with id of ${travelerId}`;
  }

  const newbooking = {};
  newbooking.travelers = curbooking.travelers;
  //console.log(newReviews);
  await bookingCollection.updateOne({_id: curbooking._id}, {$set: {travelers : curbooking.travelers}});
return "deleted"
};


  


module.exports = {createTraveler,getAllTravelers,getTraveler,removeTraveler};
