
//// No error handling done -----ATPK 


const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');

const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights } = require('../config/mongoCollections');
const flightData = require('../data/flights.js');
const userData=require('../data/usersCollection.js');
const bookingData=require('../data/bookingCollection.js');


const createReview = async (
username,
review,
rating

) => {



  //error checking
  //validation for username left
  review=await helper.checkifproperreview(review)
  rating=await helper.checkifproperrating(rating)

  //geting reviews and returning
  const reviewcollection = await reviews();

  let userinfo=await userData.getUserByEmail(username);

  if(!userinfo){
    throw 'can not find the user!!!!';
  }



  let review1 = {
    userName:username,
    userId:userinfo._id.toString(), 
    review:review,
    rating:rating
  }

  const insertInfo = await reviewcollection.insertOne(review1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add review';
  
  const newId = insertInfo.insertedId.toString();
  
//   const review2 = await getReviewById(newId);
     
//   review2._id=review2._id.toString()

//   const flightCollection= await flights()
//   try{
//       const updatedInfo= await flightCollection.updateOne({ _id: ObjectId(flightId) }, { $push: { reviews: review2 } });
//   if (updatedInfo.modifiedCount === 0) 
  
//   throw "could not add class";
//   }catch(e){throw "flight not found"}
//   const flight1 = await flightData.getFlightById(flightId);
//  return flight

  return newId;
};

const getAllReviews = async () => {    
  
  const reviewCollection = await reviews();

  const arr = await reviewCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;
};

const getReviewById = async (reviewId) => {  if(!reviewId)
  throw `no id is given`;
  if(typeof(reviewId)!=="string")
  throw `type of id is not a string`;
  if(reviewId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  reviewId=reviewId.trim();
  if(!ObjectId.isValid(reviewId))
  throw `id is not valid`;
 const reviewCollection =await reviews();
 const reviewbyid= await reviewCollection.findOne({_id:ObjectId(reviewId)});
 if(reviewbyid===null) 
 throw `no review found with that id`;
 reviewbyid._id=reviewbyid._id.toString()
 /////////
 
 return reviewbyid;};

const removeReview = async (reviewId) => {if(!reviewId)
  throw `no id is given`;
  if(typeof(reviewId)!=="string")
  throw `type of id is not a string`;
  if(reviewId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  reviewId=reviewId.trim();
  if(!ObjectId.isValid(reviewId))
  throw `id is not valid`;
  const reviewCollection =await reviews();
  var deletename= await getReviewById(reviewId);
  
  const deletedreview = await reviewCollection.deleteOne({_id: ObjectId(reviewId)});

  if (deletedreview.deletedCount === 0) {
    throw `Could not delete review with id of ${reviewId}`;
  }

  return (`has been successfully deleted! `);};

const updateReview = async (
    reviewId,
    userId,
    flightId,
    review,
    rating
) => {

  if(!reviewId)
  throw `no id is given`;
  if(typeof(reviewId)!=="string")
  throw `type of id is not a string`;
  if(reviewId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  reviewId=reviewId.trim();
  if(!ObjectId.isValid(reviewId))
  throw `id is not valid`;
  reviewId=reviewId.trim()

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
  userId=userId.trim()

  //review=await helper.checkifproperreview(review)
  //await helper.checkifproperrating(rating)

  
  ///
  const reviewCollection=await reviews()
  let updatedreview = {
    userId:userId,
    flightId:flightId,
    review:review,
    rating:rating
  }
  const updatedInfo = await reviewCollection.updateOne({_id: ObjectId(reviewId)},
  {$set: updatedreview}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update review successfully';
  
}
return await getReviewById(reviewId)

};

// async function main(){
//   try{
//     let year    = now.getFullYear();
//     let month   = now.getMonth()+1; 
//     let day     = now.getDate();
//     let hour    = now.getHours();
//     let minute  = now.getMinutes();
//     let bul=false;
//     const curr_date=year+'-'+month+'-'+day;
//     const curr_time=hour+':'+minute;
//     console.log('*****'+curr_date+curr_time+'*****');
//     let data=await userData.getUserByEmail('rpatel16@stevens.edu');
//     if(!data.bookingHistory){
//       throw 'you are not allowed to add review...';
//     }
//     if(data.bookingHistory == null){
//       throw 'you are not allowed to add review';
//     }
//     let bookings=data.bookingHistory;
//     bookings.forEach(async element => {
//       let temp_book=await bookingData.getBookingById(element);
//       let temp_flight_data=await flightData.getFlightById(temp_book.flightId);
//       console.log(temp_flight_data);
//     });
//   }catch(e){
//     console.log(e);
//   }
// }

// main();

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  removeReview,
  updateReview
};
