const express = require('express');
const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        res.render("homePage", {title:"Home Page"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// router.route("/flights").post(async (req, res) => {
//     try {
//         res.render("flightList", {title: "Flights", depart_airport: req.body.depart_airport, arrival_airport: req.body.arrival_airport,
//         date: req.body.date, passengers: req.body.passengers, class: req.body.class});
//     } catch (error) {
//         res.status(500).send(error);
//     } 
// });

module.exports = router;