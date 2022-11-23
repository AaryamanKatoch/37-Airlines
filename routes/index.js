const homepageRoutes = require('./homepage');
const flightsRoutes=require('./flights');
const adminRoutes=require('./admin')

const constructorMethod = (app) => {
    app.use('/', homepageRoutes);
    app.use('/',flightsRoutes);
    app.use('/',adminRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'not found index'});
    });
};

module.exports = constructorMethod;