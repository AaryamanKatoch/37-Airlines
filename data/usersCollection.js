const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights, users } = require('../config/mongoCollections');
const classes=require('./class')


const createUsers = async (
  firstName,
  lastName,
  userName,
  password,
  email


  

) => {
  
  const usercollection = await users();
  let user1 = {
    firstName:firstName,
    lastName:lastName,
    userName:userName,
    password:password,
    email:email,
    bookingHistory:[]
  }
  const insertInfo = await usercollection.insertOne(user1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add user';
  
     const newId = insertInfo.insertedId.toString();
  
      const user = await getUserById(newId);
     
       user._id=user._id.toString()
       return user;};

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
  userName,
  password,
  email
) => {


  
  
  ///
  const userCollection = await users();
  let updateduser = {
  firstName:firstName,
  lastName:lastName,
  userName:userName,
  password:password,
  email:email,
  }
  const updatedInfo = await userCollection.updateOne({_id: ObjectId(userId)},
  {$set: updateduser}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update user successfully';
  
}
return await getUserById(userId)

};




module.exports = {createUsers,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser
};
