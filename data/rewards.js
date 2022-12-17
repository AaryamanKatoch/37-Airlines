const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const flightData = require('../data/flights.js');
const userData=require('../data/usersCollection.js');
const bookingData=require('../data/bookingCollection.js');

const addRewards = async () => {

    let allUsers = await userData.getAllUsers();
    for(let i=0; i<allUsers.length; i++){
        if(allUsers[i].bookingHistory || allUsers[i].bookingHistory.length > 0)
        {
            console.log(allUsers[i].email);
            let flag = await check_if_user_gets_rewards(allUsers.bookingHistory);

        }
    }

};

async function check_if_user_gets_rewards(bookings) {
    var dateToday = new Date();
}

module.exports = {
    addRewards
}