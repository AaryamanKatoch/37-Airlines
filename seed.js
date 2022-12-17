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
const adminCollection = require("./data/adminCollection");
const emaildata=require("./data/email")


async function main() {
    const db = await connection.dbConnection();
   
    
    let flight1 = undefined;
    let flight2 = undefined;
    let flight3 = undefined;
    let flight4 = undefined;
    let flight5 = undefined;
    let flight6 = undefined;
    let flight26 = undefined;
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

    flight26 = await flights.createFlight("SDF43", "New York", "California", "2022-12-10", "10:00", "2022-12-11", "11:00", "88", "20");
    //console.log(flight1)
} catch (e) {
    console.log(e);
}

    try {

        flight1 = await flights.createFlight("MF090", "New York", "California", "2022-12-18", "10:00", "2022-12-19", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight2 = await flights.createFlight("MF080", "New York", "California", "2022-12-18", "10:00", "2022-12-19", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight3 = await flights.createFlight("MF070", "New York", "California", "2022-12-19", "12:00", "2022-12-20", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        flight6 = await flights.createFlight("MF060", "New York", "California", "2022-12-22", "12:00", "2022-12-23", "11:00", "1", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }


    try {

        flight4 = await flights.createFlight("SA091", "New Jersey", "Los Angeles", "2022-12-19", "17:00", "2022-12-20", "18:00", "1", "2001");
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

        class1 = await classes.createClass(flight1._id, "economy", 10, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 2000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 15, 2000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }

try{
    class1 = await classes.createClass(flight2._id,"economy",100,1000,["veg","nonveg"])
    //console.log(flight3)
}catch(e){
    console.log(e+"2");
}
try{

    class2 = await classes.createClass(flight2._id,"business",50,2000,["veg","nonveg"])
    //console.log(flight3)
}catch(e){
    console.log(e+"2");
}
try{
    class2 = await classes.createClass(flight3._id,"business",5,2000,["veg","nonveg"])
    //console.log(flight3)
}catch(e){
    console.log(e+"3");
}
try {

    class1 = await classes.createClass(flight26._id, "economy", 10, 1000, ["veg", "nonveg"])
    //console.log(flight3)
} catch (e) {
    console.log(e+"26");
}
try {

    class2 = await classes.createClass(flight26._id, "business", 5, 2000, ["veg", "nonveg"])
    //console.log(flight3)
} catch (e) {
    console.log(e+"26");
}


    // try {
    //     user1 = await users.createUsers('test1', 'test2', 'admin123@stevens.edu', 'Admin@123', 'Admin@123');
    // } catch (e) {
    //     console.log(e);
    // }

    try {
        user1 = await users.createUsers('test', 'test', 'test123@stevens.edu', 'Test@123', 'Test@123');
    } catch (e) {
        console.log(e);
    }

    // try {
    //     review1 = await review.createReview('admin123@stevens.edu', 'good one', 5)
    // } catch (e) {
    //     console.log(e);
    // }

    // try {
    //     review2 = await review.createReview('admin123@stevens.edu', 'bad one', 1)
    // } catch (e) {
    //     console.log(e);
    // }

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

try{

    adminData = await adminCollection.createAdmin("abc@gmail.com","Qwerty123!");
    //console.log(flight3)
}catch(e){
    console.log(e);
}

//  try{

// // try{

// //     adminData = await flights.getallflightdetailsforflightdetailspage("639a00cae633c3e1f81b834b","economy");
// //     console.log(adminData)
// // }catch(e){
// //     console.log(e);
// // }

//     adminData = await flights.getallflightdetailsforflightdetailspage("639a00cae633c3e1f81b834b","economy");
//     console.log(adminData)
// }catch(e){
//     console.log(e);
// }

await connection.closeConnection();
console.log('Done!');

}

main();