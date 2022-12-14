const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
//const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights, users, admin } = require('../config/mongoCollections');
const classes=require('./class');
const bcrypt = require("bcrypt");
const saltRounds = 12;


async function checkAdmin(email, password){
    email = await helper.checkifproperemail(email);
    password = await helper.checkisproperpassword(password);
    email = email.trim().toLowerCase();
    password = password.trim();
    let adminCollection = await admin();
    let adminData = await adminCollection.findOne({email : email.toLowerCase()});
    // console.log(userData);
    if(adminData == null) throw 'Either the username or password is invalid';
    let checkPassword = await bcrypt.compare(password,adminData.password);
    // if(password !== adminData.password) throw 'Either the username or password is invalid';
    if(!checkPassword) throw 'Either the username or password is invalid';
    let passwordAuthObj = {authenticatedAdmin: true};
    return passwordAuthObj;
  };
  const createAdmin = async ( 
    email,
    password,
  
  ) => {
    email = await helper.checkifproperemail(email);
    password = await helper.checkisproperpassword(password);
    
    // username = await helpers.isValidUsername(username);
    // password = await helpers.isValidPassword(password);
    // firstName = firstName.trim();
    // lastName = lastName.trim();
    email = email.trim();  
    // password = password.trim();
  
    let adminCollection = await admin();
    let adminData = await adminCollection.findOne({email : email.toLowerCase()});
    if(adminData) throw 'Email is already taken.';
    // if(password !== confirmPassword) throw 'Password does not match.';
    let passwordHashed = await bcrypt.hash(password,saltRounds);
    
    let newAdminData = {
      
      email : email.toLowerCase(),
      password : passwordHashed,
    }
    const insertInfo = await adminCollection.insertOne(newAdminData);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add user data.';
    let adminInsertedObj = {insertedAdmin: true};
    return adminInsertedObj;
  };
  module.exports = {
    checkAdmin,
    createAdmin
  };