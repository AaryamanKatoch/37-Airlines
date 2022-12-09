const express = require('express');
const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        let isLoggedIn;
        if(req.session.user) isLoggedIn = true;
        else isLoggedIn = false;
        req.session.previousURL = {previousURL:`/`};
        res.render("homePage", {title:"Home Page",isLoggedIn: isLoggedIn });
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