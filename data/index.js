
const flightData = require('./flights');
const reviewData = require('./reviewsCollection');
const classData = require('./class');
const bookedSeatsData=require('./bookedSeats')
const bookingData=require('./bookingCollection')
const travelerData=require('./travelers')
const userData=require('./usersCollection')


module.exports = {
  flights: flightData,
  reviews: reviewData,
  class: classData,
  bookedSeats:bookedSeatsData,
  bookings:bookingData,
  travelers:travelerData,
  users:userData

};
