const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews, flights } = require('../config/mongoCollections');
const flightData = require('../data/flights.js');

async function getadminflightlist(){
    const flightList= await flightData.getAllFlights()
    return flightList
}



module.exports={getadminflightlist}