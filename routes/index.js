const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {
    app.use('/', homepageRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'not found'});
    });
};

module.exports = constructorMethod;