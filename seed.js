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

///for test commit////
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
    let class3 = undefined;
    let bookedseat1 = undefined;
    let user1 = undefined;
    let user2 = undefined;
    let booking1 = undefined;
    let traveller1 = undefined;
    let review1 = undefined;
    let review2 = undefined;

   await db.dropDatabase();


   //*************************************

   try {

    flight26 = await flights.createFlight("SDF12", "New York", "Los Angeles", "2022-12-10", "10:00", "2022-12-11", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 2000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF012", "New York", "Los Angeles", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
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

        class3 = await classes.createClass(flight1._id, "first", 5, 4000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("NF013", "New York", "Los Angeles", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
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

       //*************************************


    try {
        flight3 = await flights.createFlight("MF070", "New York", "Los Angeles", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,2000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,4000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF060", "New York", "Los Angeles", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 15, 2000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }


    //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SAF41", "New jersey", "Los Angeles", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF094", "New jersey", "Los Angeles", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF084", "New jersey", "Los Angeles", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF074", "New jersey", "Los Angeles", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF064", "New jersey", "Los Angeles", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }



    //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SXF435", "New jersey", "Chicago", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF095", "New jersey", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF085", "New jersey", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF075", "New jersey", "Chicago", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF065", "New jersey", "Chicago", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }





     //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SYF45", "Phoenix", "Chicago", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 800, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF096", "Phoenix", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 800, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 1000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF086", "Phoenix", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,200,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,800,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF076", "Phoenix", "Chicago", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,800,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,1000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF066", "Phoenix", "Chicago", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }






    //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SR437", "New jersey", "boston", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF097", "New jersey", "boston", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF087", "New jersey", "boston", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF077", "New jersey", "boston", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF067", "New jersey", "boston", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }
    




    //******************************************* */
    //******************************************* */

     //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SQ438", "New jersey", "Dallas", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF098", "New jersey", "Dallas", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF088", "New jersey", "Dallas", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF078", "New jersey", "Dallas", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF068", "New jersey", "Dallas", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }



    //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SDU39", "New jersey", "Dallas", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF099", "New jersey", "Dallas", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF089", "New jersey", "Dallas", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF079", "New jersey", "Dallas", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF069", "New jersey", "Dallas", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }





     //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SDW12", "florida", "Chicago", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 800, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("MF912", "florida", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 800, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 1000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("MF812", "florida", "Chicago", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,200,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,800,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("MF712", "florida", "Chicago", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,800,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,1000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("MF612", "florida", "Chicago", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 200, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }






    //*************************************
    //*************************************

   try {

    flight26 = await flights.createFlight("SDV33", "New jersey", "florida", "2022-12-22", "10:00", "2022-12-23", "11:00",  "20");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight26._id, "economy", 100, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }
    try {
    
        class2 = await classes.createClass(flight26._id, "business", 50, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e+"26");
    }

       //*************************************


    try {

        flight1 = await flights.createFlight("M913", "New jersey", "florida", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class1 = await classes.createClass(flight1._id, "economy", 10, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }
    try {

        class2 = await classes.createClass(flight1._id, "business", 5, 1000, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

    try {

        class3 = await classes.createClass(flight1._id, "first", 5, 3000, ["veg", "nonveg","vegan","salad"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"1");
    }

       //*************************************

    try {

        flight2 = await flights.createFlight("M813", "New jersey", "florida", "2022-12-21", "10:00", "2022-12-22", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class1 = await classes.createClass(flight2._id,"economy",100,500,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }
    try{
    
        class2 = await classes.createClass(flight2._id,"business",50,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"2");
    }

       //*************************************


    try {
        flight3 = await flights.createFlight("M713", "New jersey", "florida", "2022-12-20", "12:00", "2022-12-21", "11:00", "20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try{
        class2 = await classes.createClass(flight3._id,"business",5,1000,["veg","nonveg"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }

    try{
        class2 = await classes.createClass(flight3._id,"first",5,3000,["veg","nonveg","vegan","salad"])
        //console.log(flight3)
    }catch(e){
        console.log(e+"3");
    }


       //*************************************


    try {

        flight6 = await flights.createFlight("M613", "New jersey", "florida", "2022-12-22", "12:00", "2022-12-23", "11:00","20");
        //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {

        class2 = await classes.createClass(flight6._id, "economy", 150, 500, ["veg", "nonveg"])
        //console.log(flight3)
    } catch (e) {
        console.log(e +"6");
    }
    












    try {
        user1 = await users.createUsers('test', 'test', 'test123@stevens.edu', 'Test@123', 'Test@123');
    } catch (e) {
        console.log(e);
    }

    try {
        // console.log(user1._id);
        let bookingData = await bookingCollection.createBooking(flight26._id, user1._id);
        let updatedBooking = await travelers.createTraveler(bookingData._id,"Parth","Patel","123456789","2022-12-01","male","pp997069@gmail.com","5512468510","economy","veg");
        let updatedClassCapacity = await classes.updateClassCapacity(flight26._id,"economy","1");
        let enterBookingHistory = await users.updateBookingHistory(user1._id,bookingData._id);
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


    try{

        adminData = await adminCollection.createAdmin("abc@gmail.com","Qwerty123!");
        //console.log(flight3)
    }catch(e){
        console.log(e);
    }

    await connection.closeConnection();
    console.log('Done!');

}

main();