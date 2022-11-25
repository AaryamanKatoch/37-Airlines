const mongoCollections = require('../config/mongoCollections');

const flights = mongoCollections.flights;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const moment = require('moment');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');


//added date in create and update flight
const createFlight = async (
  flightCode,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  duration,
  miles,
  date
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
  date:date,
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
       return flight;
};

const getAllFlights = async () => {    
  const flightCollection = await flights();
  const arr = await flightCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;
};

const getFlightById = async (flightId) => {  
  if(!flightId)
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
 for(i=0;i<flightbyid.reviews.length;i++){
  flightbyid.reviews[i]._id=flightbyid.reviews[i]._id.toString()
 }
 return flightbyid;
};

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

  return (`${deletename.flightId} has been successfully deleted! `);

};
const updateFlight = async (
  flightCode,
  flightId,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  duration,
  miles,
  date
  
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
    date:date,
  }
  const updatedInfo = await flightCollection.updateOne({_id: ObjectId(id)},
  {$set: updatedflight}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update flight successfully';
  
}
return await getFlightById(id);

};

const searchFlightsResult = async (
  departure,
  arrival,
  date,
  NoOfPass,
  f_class
) => {
  if(!departure) throw 'No departure passed!';
  if(!arrival) throw 'No arrival passed!';
  if(!date) throw 'No date passed';
  if(!NoOfPass) throw 'No passengers passed!';
  if(departure.trim().length==0) throw 'departure can not be empty string';
  if(arrival.trim().length==0) throw 'arrival can not be empty string';
  if(!typeof departure=='string') throw 'departure must be valid string';
  if(!typeof arrival=='string') throw 'arrival must be valid string';
  if(isNaN(NoOfPass)) throw 'Number of passengers must be valid Number';
  const flightCollection =await flights();
  let date_arr=[];
  date_arr.push(date);
  date=new Date(date);
  for (let i = 1; i < 4; i++) {
    date.setDate(date.getDate() + 1);
    date=date.toISOString();
    date_arr.push(date.split('T')[0]);
    date=new Date(date) 
  }
  console.log(date_arr);
  const flightsList = await flightCollection.find({'departure':departure,'arrival':arrival,'date':{ $in: date_arr }}).toArray();
  if(flightsList==null){
    return flightsList;
  }
  let f_flightList=[];
  flightsList.forEach(element => {
    let add_flag=false;
    let temp=element.flightClass;
    //console.log('*',temp);
    temp.forEach(element => {
      if(element.classType==f_class){
        if(element.seatNumbers.length>=NoOfPass){
          add_flag=true;
          //console.log('you can book!!-->',element.classType);
        }
      }
    });
    if(add_flag){
      f_flightList.push(element);
      //console.log('adding this');
    }
  });
  //console.log(f_flightList);
  return f_flightList;
}

async function getallflightdetailsforflightdetailspage(id,fclass){
  const flightCollection=await flights()
  flightdetails=await getFlightById(id)
  const allflights = await flightCollection.find({}).toArray();
  let resclass={}
  for(i=0;i<allflights.length;i++){
    curflight=allflights[i]
    if(curflight._id==id){
    for(j=0;j<curflight.flightClass.length;j++){
      
      if(fclass==curflight.flightClass[j].classType){
        resclass=curflight.flightClass[j]
      }
    }
  }}
  
  let myflight={
  flightCode:flightdetails.flightCode,
  departure:flightdetails.departure,
  arrival:flightdetails.arrival,
  departureTime:flightdetails.departureTime,
  arrivalTime:flightdetails.arrivalTime,
  duration:flightdetails.duration,
  miles:flightdetails.miles,
  flightClass:resclass
}

return myflight
}
  
// async function main(){
//   try{
//     let result=await searchFlightsResult('New York','California','2022-12-10',2,'economy');
//     console.log(result);
//   }catch(e){
//     console.log(e);
//   }
//   console.log('done');
//   process.exit();
// }

// main();

module.exports = {getallflightdetailsforflightdetailspage,
  createFlight,
  getAllFlights,
  getFlightById,
  removeFlight,
  updateFlight,
  searchFlightsResult
};
