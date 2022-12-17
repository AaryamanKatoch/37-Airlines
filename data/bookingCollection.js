const mongoCollections = require('../config/mongoCollections');

const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');

const { reviews, flights, users, bookings } = require('../config/mongoCollections');



const createBooking = async (
 flightId,
 userId
) => {

  if(!flightId)
  throw `no Flight id is given`;
  if(typeof(flightId)!=="string")
  throw `type of flight id is not a string`;
  if(flightId.trim().length===0)
  throw 'flight id cannot be empty or all white spaces';
  flightId=flightId.trim();
  if(!ObjectId.isValid(flightId))
  throw `flight id is not valid`;
  flightId=flightId.trim();


  if(!userId)
  throw `no user id is given`;
  if(typeof(userId)!=="string")
  throw `type of user id is not a string`;
  if(userId.trim().length===0)
  throw 'user id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `user id is not valid`;
  userId=userId.trim();


  
  const bookingcollection = await bookings();
  let booking1 = {
 travelers:[],
 flightId:flightId,
 userId:userId
  }
  const insertInfo = await bookingcollection.insertOne(booking1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add booking';
  
     const newId = insertInfo.insertedId.toString();
  
      const booking = await getBookingById(newId);
     
       booking._id=booking._id.toString()
       return booking;};

const getAllBookings = async () => {    const bookingCollection = await bookings();

  const arr = await bookingCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;};

const getBookingById = async (bookingId) => {  if(!bookingId)
  throw `no booking id is given`;
  if(typeof(bookingId)!=="string")
  throw `type of booking id is not a string`;
  if(bookingId.trim().length===0)
  throw 'booking id cannot be empty or all white spaces';
  bookingId=bookingId.trim();
  if(!ObjectId.isValid(bookingId))
  throw `booking id is not valid`;
 const bookingCollection =await bookings();
 const bookingbyid= await bookingCollection.findOne({_id:ObjectId(bookingId)});
 if(bookingbyid===null) 
 throw `no booking found with that id`;
 bookingbyid._id=bookingbyid._id.toString();


 return bookingbyid;};

const removeBooking = async (bookingId) => {if(!bookingId)
  throw `no id is given`;
  if(typeof(bookingId)!=="string")
  throw `type of id is not a string`;
  if(bookingId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookingId=bookingId.trim();
  if(!ObjectId.isValid(bookingId))
  throw `id is not valid`;
  const bookingCollection =await bookings();
  var deletename= await getBookingById(bookingId);
  
  const deletedbooking = await bookingCollection.deleteOne({_id: ObjectId(bookingId)});

  if (deletedbooking.deletedCount === 0) {
    throw `Could not delete booking with id of ${bookingId}`;
  }

  return (`successfully deleted! `);};

const updateBooking = async (
    bookingId,
    flightId,
    userId
) => {
  if(!bookingId)
  throw `no id is given`;
  if(typeof(bookingId)!=="string")
  throw `type of id is not a string`;
  if(bookingId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookingId=bookingId.trim();
  if(!ObjectId.isValid(bookingId))
  throw `id is not valid`;


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


  if(!userId)
  throw `no id is given`;
  if(typeof(userId)!=="string")
  throw `type of id is not a string`;
  if(userId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `id is not valid`;
  userId=userId.trim();


  const bookingCollection = await bookings();
  let updatedbooking = {
    flightId:flightId,
    userId:userId
  }
  const updatedInfo = await bookingCollection.updateOne({_id: ObjectId(bookingId)},
  {$set: updatedbooking}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update booking successfully';
  
}
return await getBookingById(bookingId)

};




module.exports = {createBooking,
  getAllBookings,
  getBookingById,
  removeBooking,
  updateBooking
};
