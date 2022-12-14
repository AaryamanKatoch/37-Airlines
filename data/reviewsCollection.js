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
  username=await helper.checkifproperemail(username)
  review=await helper.checkifproperreview(review)
  rating=await helper.checkifproperrating(rating)

  //creating reviews collection object
  const reviewcollection = await reviews();

  //verifying user
  let userinfo=await userData.getUserByEmail(username);

  if(!userinfo){
    throw 'can not find the user!!!!';
  }

  //checking for user can add review or not
  let data=await userData.getUserByEmail(username);
  if(!data.bookingHistory){
    throw 'you are not allowed to add review...';
  }
  if(data.bookingHistory.length === 0){
    throw 'you are not allowed to add review';
  }
  let bul= await check_if_user_can_add_review(data.bookingHistory);
  
  //if bul is true then user have atleast completed one flight 
  if(bul==true){
    //console.log('got true')

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
    return newId;

  }else{
    throw 'you are not allowed to add review now...'
  }

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

const removeReview = async (reviewId) => {
  if(!reviewId)
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

  return (`has been successfully deleted! `);
};

 // error handling not done for review and rating ------ @ridham 
const updateReview = async (
    reviewId,
    username,
    review,
    rating
) => {
    //error checking
    username=await helper.checkifproperemail(username)
    review=await helper.checkifproperreview(review)
    rating=await helper.checkifproperrating(rating)
    if(!reviewId)
    throw `no id is given`;
    if(typeof(reviewId)!=="string")
    throw `type of id is not a string`;
    if(reviewId.trim().length===0)
    throw 'id cannot be empty or all white spaces';
    reviewId=reviewId.trim();
    if(!ObjectId.isValid(reviewId))
    throw `id is not valid`;

    const reviewcollection = await reviews();

    let userinfo=await userData.getUserByEmail(username);
  
    if(!userinfo){
      throw 'can not find the user!!!!';
    }


  let updatedreview = {
    userId:userinfo._id.toString(),
    userName:username,
    review:review,
    rating:rating
  }
  const updatedInfo = await reviewcollection.updateOne({_id: ObjectId(reviewId)},{$set: updatedreview});
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update review successfully';  
  }
return await getReviewById(reviewId);
};

async function check_if_user_can_add_review(bookings){
  var now = new Date();
  let year    = now.getFullYear();
  let month   = now.getMonth()+1; 
  let day     = now.getDate();
  let hour    = now.getHours();
  hour=await helper.addDigitIfNeeded(hour.toString());
  let minute  = now.getMinutes();
  minute=await helper.addDigitIfNeeded(minute.toString());
  let curr_date=year+'-'+month+'-'+day;
  let curr_time=hour+':'+minute;
  for (let i = 0; i < bookings.length; i++){
    let temp_book=await bookingData.getBookingById(bookings[i]);
    let temp_flight_data=await flightData.getFlightById(temp_book.flightId);
    let arr_date=temp_flight_data.arrivalDate;
    let arr_time=temp_flight_data.arrivalTime;
    //console.log('curr date*****',curr_date,'*****');
    //console.log('*****',curr_time,'*****')
    //console.log("arrr date*****",arr_date,'*****');
    //console.log("*****",arr_time,'*****');
    const curr_date_obj=new Date(curr_date);
    const arrr_date_obj=new Date(arr_date);
    //console.log(curr_date_obj)
    //console.log(arrr_date_obj)
    if(curr_date_obj > arrr_date_obj){
      //console.log('curr > arr')
      return true;
    }else if(curr_date_obj.toDateString() === arrr_date_obj.toDateString()){
      //console.log('curr = arr')
      if(curr_time > arr_time){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      //console.log('curr < arr')
      return false;
    }
  }
}

async function getReviewByUsername(userName){
  userName=await helper.checkifproperemail(userName);
  //creating reviews collection object
  const reviewcollection = await reviews();

  //verifying user
  let userinfo=await userData.getUserByEmail(userName);
  
  if(!userinfo){
    throw 'can not find the user!!!!';
  }

  const reviewByUsername= await reviewcollection.findOne({userName:userName});
  if(!reviewByUsername || reviewByUsername==null){
    return null;
  }else{
    return reviewByUsername;
  }
}

// async function main(){
//   try{
//     let val=await getReviewByUsername('test123@stevens.edu');
//     console.log(val)
//   }catch(e){
//     console.log(e)
//   }
//   // try{
//   //   let upval=await updateReview('639e6a71cc6c80ebe63e5f10','rpatel16@stevens.edu','updated',5)
//   //   console.log(upval);
//   // }catch(e){
//   //  console.log(e) 
//   // }
// }

// main();

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  removeReview,
  getReviewByUsername,
  updateReview,
  check_if_user_can_add_review
};
