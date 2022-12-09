const flights = require('./data/flights');
const classes = require('./data/class');
const bookedSeats = require('./data/bookedSeats');
const users = require("./data/usersCollection");
const bookingCollection = require("./data/bookingCollection")
const travelers = require("./data/travelers")
const review = require("./data/reviewsCollection")
const connection = require('./config/mongoConnection');
const { bookings } = require('./config/mongoCollections');
const adminhome = require("./data/adminfunctions")
const userhome = require("./data/userfunctions")


async function main() {
    const db = await connection.dbConnection();
    let flight1 = undefined;
    let flight2 = undefined;
    let flight3 = undefined;
    let flight4 = undefined;
    let flight5 = undefined;
    let flight6 = undefined;
    let class1 = undefined;
    let class2 = undefined;
    let bookedseat1 = undefined;
    let user1 = undefined;
    let user2 = undefined;
    let booking1 = undefined;
    let traveller1 = undefined;
    let review1 = undefined;
    let review2 = undefined;
    await db.dropDatabase();

    try {

        flight1 = await flights.createFlight("MF090", "New York", "California", "2022-12-10", "10:00", "2022-12-11", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight2 = await flights.createFlight("MF080", "New York", "California", "2022-12-10", "10:00", "2022-12-11", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight3 = await flights.createFlight("MF070", "New York", "California", "2022-12-11", "12:00", "2022-12-12", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight6 = await flights.createFlight("MF060", "New York", "California", "2022-12-16", "12:00", "2022-12-17", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }


    try {

        flight4 = await flights.createFlight("SA091", "New Jersey", "Los Angeles", "2022-12-11", "17:00", "2022-12-12", "18:00", "1", "2001");
        //console.log(flight2)
    } catch (e) {
        console.log(e);
    }
    try {

        flight5 = await flights.createFlight("SA092", "Seattle", "Washinton", "2022-12-15", "18:00", "2022-12-15", "20:00", "2", "21");
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, "1000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, "2000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 15, "2000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }

    try {
        class1 = await classes.createClass(flight2._id, "economy", 10, "1000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }
    try {

        class2 = await classes.createClass(flight2._id, "business", 5, "2000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }
    try {
        class2 = await classes.createClass(flight3._id, "business", 5, "2000", ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }
    try {

        bookedseat1 = await bookedSeats.createBookedSeats(flight1._id, 2, "travelerid1", class1.classType)
        //console.log(flight3)
    } catch (e) {
        console.log(e);
    }

    try {
        user1 = await users.createUsers('test1', 'test2', 'admin123@stevens.edu', 'Admin@123', 'Admin@123');
    } catch (e) {
        console.log(e);
    }

    try {
        review1 = await review.createReview('admin123@stevens.edu', 'good one', 5)
    } catch (e) {
        console.log(e);
    }

    try {
        review2 = await review.createReview('admin123@stevens.edu', 'bad one', 1)
    } catch (e) {
        console.log(e);
    }

    // try{

    //     user1 = await users.createUsers("Aaryaman","Katoch","atpk","password","smthin@smthin.com")
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }
    // try{

    //     user2 = await users.createUsers("Aaryaman22","Katoch22","atpk22","password22","smthin@smthin.com22")
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }
    // try{

    //     booking1 = await bookingCollection.createBooking(flight1._id,user1._id)
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }
    // try{

    //     traveller1 = await travelers.createTraveler(booking1._id,"parth","patel","S9182778","19/09/1999","Male","parth@stevens.edu","5512548455",bookedseat1.classtype,"veg")
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }

    // try{

    //     review1 = await review.createReview(user1._id,flight1._id,"flight was bad",1)
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }

    // try{

    //     review2 = await review.createReview(user1._id,flight1._id,"flight was awesome",4)
    //     //console.log(flight3)
    // }catch(e){
    //     console.log(e);
    // }
    /*
    try{
        admintest=await flights.updateFlight( )
        console.log(admintest)
    } catch(e){
        console.log(e)
    }*/


    console.log('done!!');
    await connection.closeConnection();
}
main();