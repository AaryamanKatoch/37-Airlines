
const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
//const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights, users } = require('../config/mongoCollections');
const classes=require('./class');
const bcrypt = require("bcrypt");
const saltRounds = 12;


const createUsers = async (
  firstName,
  lastName,  
  email,
  password,
  confirmPassword, 

) => {
  firstName=await helper.checkifproperflname(firstName)
  lastName=await helper.checkifproperflname(lastName)
  email=await helper.checkifproperemail(email)
  password=await helper.checkisproperpassword(password)
  confirmPassword=await helper.checkisproperpassword(confirmPassword)
  //const usercollection = await users();
  // let user1 = {
  //   firstName:firstName,
  //   lastName:lastName,
  //   password:password,
  //   email:email,
  //   bookingHistory:[]
  // }
  // username = await helpers.isValidUsername(username);
  // password = await helpers.isValidPassword(password);
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();  
  // password = password.trim();

  let userCollection = await users();
  let userData = await userCollection.findOne({email : email.toLowerCase()});
  if(userData) throw 'Email is already taken.';
  if(password !== confirmPassword) throw 'Password does not match.';
  let passwordHashed = await bcrypt.hash(password,saltRounds);
  
  let newUserData = {
    firstName : firstName.toLowerCase(),
    lastName : lastName.toLowerCase(),
    email : email.toLowerCase(),
    password : passwordHashed,
    bookingHistory : []
  }
  const insertInfo = await userCollection.insertOne(newUserData);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add user data.';
  let userInsertedObj = {insertedUser: true};
  let user = await getUserById(insertInfo.insertedId.toString());
  return user;
};

const getAllUsers = async () => {    const userCollection = await users();

  const arr = await userCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;};

const getUserById = async (userId) => {  if(!userId)
  throw `no id is given`;
  if(typeof(userId)!=="string")
  throw `type of id is not a string`;
  if(userId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `id is not valid`;
 const userCollection =await users();
 const userbyid= await userCollection.findOne({_id:ObjectId(userId)});
 if(userbyid===null) 
 throw `no user found with that id`;
 userbyid._id=userbyid._id.toString()
 /////////

 return userbyid;};

const removeUser = async (userId) => {if(!userId)
  throw `no id is given`;
  if(typeof(userId)!=="string")
  throw `type of id is not a string`;
  if(userId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `id is not valid`;
  const userCollection =await users();
  var deletename= await getUserById(userId);
  
  const deleteduser = await userCollection.deleteOne({_id: ObjectId(userId)});

  if (deleteduser.deletedCount === 0) {
    throw `Could not delete user with id of ${userId}`;
  }

  return (`${deletename.userName} has been successfully deleted! `);};

const updateUser = async (
  userId,
  firstName,
  lastName,

  
) => {
  const userCollection = await users();
  let updateduser = {
  firstName:firstName,
  lastName:lastName
  }
  
  const updatedInfo = await userCollection.updateOne({_id: ObjectId(userId)},
  {$set: updateduser}
);
/*
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update user successfully';
}*/


};

async function checkUser(email, password){
  // username = await helpers.isValidUsername(username);
  // password = await helpers.isValidPassword(password);
  email=await helper.checkifproperemail(email)
  password=await helper.checkisproperpassword(password)
  email = email.trim().toLowerCase();
  password = password.trim();
  let userCollection = await users();
  let userData = await userCollection.findOne({email : email});
  // console.log(userData);
  if(userData == null) throw 'Either the username or password is invalid';
  let checkPassword = await bcrypt.compare(password,userData.password);
  if(!checkPassword) throw 'Either the username or password is invalid';
  let passwordAuthObj = {authenticatedUser: true};
  return passwordAuthObj;
};

async function getUserByEmail(email){
  email=await helper.checkifproperemail(email)
  email = email.trim().toLowerCase();
  let userCollection = await users();
  let userData = await userCollection.findOne({email : email});
//  console.log(userData);
 
  if(userData == null) throw 'Either the username or password is invalid';
  return userData;
}

async function updateBookingHistory(userId,bookingId){
  if(!userId)
  throw `no id is given`;
  if(typeof(userId)!=="string")
  throw `type of id is not a string`;
  if(userId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `id is not valid`;

  if(!bookingId)
  throw `no id is given`;
  if(typeof(bookingId)!=="string")
  throw `type of id is not a string`;
  if(bookingId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  bookingId=bookingId.trim();
  if(!ObjectId.isValid(bookingId))
  throw `id is not valid`;

  const userCollection = await users();
  // const getUserDetails = await userCollection.getUserById(userId);
  let updateHistory = await userCollection.updateOne({_id : ObjectId(userId)},{$push : {bookingHistory : bookingId}});
  if (updateHistory.modifiedCount === 0) {
    throw 'could not update user booking history successfully';
  } 
  return updateHistory;
}


async function updateBookingArr(userId,bookingArr){
  if(!userId)
  throw `no id is given`;
  if(typeof(userId)!=="string")
  throw `type of id is not a string`;
  if(userId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  userId=userId.trim();
  if(!ObjectId.isValid(userId))
  throw `id is not valid`;

  if(!bookingArr)
  throw `no booking array is given`;
  if (!(Array.isArray(bookingArr))) throw (`Error: Booking History Array input \"${bookingArr}\" is not an Array`);
  for(let i=0; i<bookingArr.length; i++){
    bookingId = bookingArr[i].trim();
    if (!ObjectId.isValid(bookingId)) throw (`Error: Booking ID not valid`);
}

  const userCollection = await users();
  // const getUserDetails = await userCollection.getUserById(userId);
  let updateHistory = await userCollection.updateOne({_id : ObjectId(userId)},{$set : {bookingHistory : bookingArr}});
  if (updateHistory.modifiedCount === 0) {
    throw 'could not update user booking history successfully';
  } 
  return updateHistory;
}


module.exports = {createUsers,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser,
  checkUser,
  getUserByEmail,
  updateBookingHistory,
  updateBookingArr
};
