const express = require('express');
const router = express.Router();
const data = require('../data');
const flightsData = data.flights;
const classes = require('../data/class');
const bookingCollection = require('../data/bookingCollection');
const travelerData = require('../data/travelers');
const userCollection = require('../data/usersCollection');
const path = require('path');
require('dotenv').config()

async function getmaildata(bookingid){

    if(!bookingid)
    throw `no id is given`;
    if(typeof(bookingid)!=="string")
    throw `type of id is not a string`;
    if(bookingid.trim().length===0)
    throw 'id cannot be empty or all white spaces';
    bookingid=bookingid.trim();
    




let mybooking= await bookingCollection.getBookingById(bookingid)
newbook={}
maillist=[]
for(i=0;i<mybooking.travelers.length;i++){
    maillist.push(mybooking.travelers[i].email)
}
newbook["maillist"]=maillist
let flightdet=await flightsData.getFlightById(mybooking.flightId)
newbook["fcode"]=flightdet.flightCode
newbook["departure"]=flightdet.departure
newbook["departureDate"]=flightdet.departureDate
newbook["departureTime"]=flightdet.departureTime
return newbook
}

async function myemail(bid){

    if(!bid)
    throw `no id is given`;
    if(typeof(bid)!=="string")
    throw `type of id is not a string`;
    if(bid.trim().length===0)
    throw 'id cannot be empty or all white spaces';
    bid=bid.trim();
   




const nbook=await getmaildata(bid)

for(i=0;i<nbook.maillist.length;i++){
   let email=nbook.maillist[i]
    let fcode=nbook.fcode
    let depart=nbook.departure
    let date=nbook.departureDate
    let time=nbook.departureTime
let nodemailer=require('nodemailer');
let transporter = nodemailer.createTransport({
    service:'smtp@gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:'aaryamantpkatoch@gmail.com',
        pass:"qjrnkfbwokfxwdle"
    }
});

let  mailoptions ={
    from :'aaryamantpkatoch@gmail.com',
    to: email,
    subject : "Email Confirmation Test - CS546B_Group 37",
    text:`Hi , your ticket has been confirmed for ${fcode} departing on ${date} ${time} from ${depart}`
};

transporter.sendMail(mailoptions,function(error,info){
    if(error)
    console.log(error);
    
});
}
}

module.exports={getmaildata,myemail}