const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights } = require('../config/mongoCollections');
const userData = require('../data/usersCollection');
const bookingdata=require('../data/bookingCollection')
const flightdata=require('../data/flights');
const { bookings } = require('.');
 


async function getuserinfoforuserprofile(useremail){
useremail=await helper.checkifproperemail(useremail)

resobj={}
const sol=await userData.getUserByEmail(useremail)
resobj["firstName"]=sol.firstName
resobj["lastName"]=sol.lastName
resobj["email"]=sol.email
resobj["bookings"]=[]
let bookings=sol.bookingHistory
for(let i=0;i<bookings.length;i++){
let eachbooking = await bookingdata.getBookingById(bookings[i])
let eachbobj={}
eachbobj["numbertravelers"]=eachbooking.travelers.length
let eachbfid=eachbooking.flightId
let eachbfdet=await flightdata.getFlightById(eachbfid)
eachbobj["FlightCode"]=eachbfdet.flightCode
eachbobj["Departure"]=eachbfdet.departure
eachbobj["Arrival"]=eachbfdet.arrival
eachbobj["DepartureDate"]=eachbfdet.departureDate
resobj["bookings"].push(eachbobj)
}
return resobj
}




module.exports={getuserinfoforuserprofile}