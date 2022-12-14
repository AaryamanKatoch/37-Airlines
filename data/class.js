const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const {flights}=require('../config/mongoCollections');
const {getFlightById }= require("./flights")
const flightData = require('../data/flights.js');
const helper=require('../helpers')

const createClass = async (
  fid,
  classType,
  classCapacity,
  price,
  foodchoices
) => {
  

//classType=await helper.checkifproperclasstype(classType)
//classCapacity=await helper.checkifproperclasscapacity(classCapacity)
//price=await helper.checkifproperprice(price)
//foodchoices=await helper.checkifproperfoodchoices(foodchoices)
if(!fid)
throw `no id is given`;
if(typeof(fid)!=="string")
throw `type of id is not a string`;
if(fid.trim().length===0)
throw 'id cannot be empty or all white spaces';
fid=fid.trim();
if(!ObjectId.isValid(fid))
throw `id is not valid`;
fid=fid.trim()

classType=await helper.checkifproperclasstype(classType)
classCapacity=await helper.checkifproperclasscapacity(classCapacity)
price=await helper.checkifproperprice(price)
foodchoices=await helper.checkifproperfoodchoices(foodchoices)


  const classId=ObjectId();
  const flightCollection= await flights()
 
  
  let class1 = {
  
    classType:classType,
    classCapacity:classCapacity,
    maxCapacity:classCapacity,
    price:price,
    foodchoices:foodchoices
  }


  
  const updatedClass = { _id: classId, ...class1 };
 


  try{
  const updatedInfo= await flightCollection.updateOne({ _id: ObjectId(fid) }, { $push: { flightClass: updatedClass } });
  if (updatedInfo.modifiedCount === 0) 
    throw "could not add class";
  }catch(e){throw "flight not found"}
  const flight1 = await flightData.getFlightById(fid);
 return flight1
};





const getAllClasses = async (fid) => {
  if(!fid)
  throw `no id is given`;
  if(typeof(fid)!=="string")
  throw `type of id is not a string`;
  if(fid.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  fid=fid.trim();
  if(!ObjectId.isValid(fid))
  throw `id is not valid`;
  fid=fid.trim()
 
  
  const flight1 = await flightData.getFlightById(fid);

 return flight1.flightClass
};

const getClass = async (classId) => {
  
  if(!classId)
  throw `no id is given`;
  if(typeof(classId)!=="string")
  throw `type of id is not a string`;
  if(classId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  classId=classId.trim();
  if(!ObjectId.isValid(classId))
  throw `id is not valid`;
  classId=classId.trim()

const flightCollection= await flights()

const flightList = await flightCollection.find({}).toArray();
let found = false;
let fclass = {};
for (let i = 0; i < flightList.length; i++) {
    const currentflight = flightList[i];
    for (let j = 0; j < currentflight.flightClass.length; j++) {
        if (currentflight.flightClass[j]._id.toString() == classId) {
            found= true;
            fclass = currentflight.flightClass[j];
        }
    }
}
if (!found) throw 'no class with that id';
fclass._id=fclass._id.toString()
return fclass;
};



const removeClass = async (classId) => {
  if(!classId)
  throw `no id is given`;
  if(typeof(classId)!=="string")
  throw `type of id is not a string`;
  if(classId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  classId=classId.trim();
  if(!ObjectId.isValid(classId))
  throw `id is not valid`;
  classId=classId.trim()


  const flightCollection = await flights();
  const allflights = await flightCollection.find({}).toArray();
  let classFound = false;
  let flightId = "";
  let newallflights = [];
  let curflight = {};
  for (let i = 0; i < allflights.length; i++) {
      curflight = allflights[i];
      let oldclassList = curflight.flightClass;     
for (let j = 0; j < oldclassList.length; j++) {
          if (oldclassList[j]._id.toString() == classId) {



  classFound = true;
  flightId = oldclassList[j]._id;
              for (let k = 0; k < oldclassList.length; k++) {
          if (oldclassList[k]._id.toString() == classId) {
    continue;
    

                  }
    newallflights.push(oldclassList[k]);
              }
          }
    if (classFound) break;
      }
      curflight.flightClass = newallflights;
      if (classFound) break;
  }
  if (!classFound) {
      throw `could not delete class with id of ${classId}`;
  }

  const newclass = {};
  newclass.flightClass = curflight.flightClass;

  await flightCollection.updateOne({_id: curflight._id}, {$set: {flightClass : curflight.flightClass}});
  newflight = await getFlightById(curflight._id.toString());
return newflight

};

async function getFoodChoiceFromClass(flightId, classType)
{
  //classType=await helper.checkifproperclasstype(classType)
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

 classType=await helper.checkifproperclasstype(classType)

  const flightCollection = await flights();
  let getFlightClass = await flightCollection.findOne({_id : ObjectId(flightId)},{projection:{_id: 0, flightClass : {$elemMatch: {classType : classType}}}});
  //console.log(getFlightClass);
  return getFlightClass.flightClass[0].foodchoices;
}

async function updateClassCapacity(flightId, classType, noOfPass) // check for number of passengers ----ATPK
{
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


classType=await helper.checkifproperclasstype(classType);
noOfPass = await helper.checkifproperNoOfPass(noOfPass);



  const flightCollection = await flights();
  let getFlightClass = await flightCollection.findOne({_id : ObjectId(flightId)},{projection:{_id: 0, flightClass : {$elemMatch: {classType : classType}}}});
  let updateFlightClassCapacity = parseInt(getFlightClass.flightClass[0].classCapacity) - parseInt(noOfPass);
  let updateFlightClass = await flightCollection.updateOne({_id : ObjectId(flightId), "flightClass.classType" : classType},{$set : {"flightClass.$.classCapacity" : updateFlightClassCapacity}});
 // console.log(updateFlightClass);
  return updateFlightClass;
}

async function getFlightClassPrice(flightId, classType)
{
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


classType=await helper.checkifproperclasstype(classType)




  const flightCollection = await flights();
  let getFlightClass = await flightCollection.findOne({_id : ObjectId(flightId)},{projection:{_id: 0, flightClass : {$elemMatch: {classType : classType}}}});
  let flightClassPrice = parseInt(getFlightClass.flightClass[0].price);
  return flightClassPrice;  
}

  


module.exports = {createClass,getAllClasses,getClass,removeClass,getFoodChoiceFromClass,updateClassCapacity,getFlightClassPrice};
