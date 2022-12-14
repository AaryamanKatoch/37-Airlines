const homepageRoutes = require('./homepage');
const flightsRoutes=require('./flights');
const adminRoutes=require('./admin');
const authRoutes = require('./authentication');
const userRoutes =require('./user')
const reviewRoutes= require('./reviews');

const constructorMethod = (app) => {
    app.use('/', homepageRoutes);
    app.use('/',flightsRoutes);
    app.use('/',adminRoutes);
    app.use('/', authRoutes);
    app.use('/', userRoutes);
    app.use('/',reviewRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'not found index'});
    });
};

module.exports = constructorMethod;