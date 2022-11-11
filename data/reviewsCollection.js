const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights } = require('../config/mongoCollections');
const flightData = require('../data/flights.js');


const createReview = async (

userId,
flightId,
review,
rating

) => {
  
  const reviewcollection = await reviews();
  let review1 = {
    userId:userId,
    flightId:flightId,
    review:review,
    rating:rating
  }
  const insertInfo = await reviewcollection.insertOne(review1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add review';
  
     const newId = insertInfo.insertedId.toString();
  
      const review2 = await getReviewById(newId);
     
       review2._id=review2._id.toString()
      ///
      const flightCollection= await flights()
      try{
      const updatedInfo= await flightCollection.updateOne({ _id: ObjectId(flightId) }, { $push: { reviews: review2 } });
  if (updatedInfo.modifiedCount === 0) 
  
  throw "could not add class";
  }catch(e){throw "flight not found"}
  const flight1 = await flightData.getFlightById(flightId);
 return flight1
       };

const getAllReviews = async () => {    const reviewCollection = await reviews();

  const arr = await reviewCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;};

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




module.exports = {createReview,
  getAllReviews,
  getReviewById,
  removeReview,
  updateReview
};
