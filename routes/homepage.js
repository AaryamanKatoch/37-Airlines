const express = require('express');
const router = express.Router();
const xss = require('xss');
const rewardsData = require('../data/rewards.js');

router.route("/").get(async (req, res) => {
    let haserror=false;
    let error;
    try {
        let isLoggedIn;
        if(req.session.user) isLoggedIn = true;
        else isLoggedIn = false;
        //await rewardsData.addRewards();
        return res.status(200).render("homePage", {title:"Home Page",isLoggedIn: isLoggedIn,haserror:haserror,error:error });
    } catch (e) {haserror=true;error=e
        return res.status(200).render("homePage", {title:"Home Page",isLoggedIn: isLoggedIn,haserror:haserror,error:error });
    }
    res.status(500).render("homePage", {title:"Home Page",isLoggedIn: isLoggedIn,haserror:haserror,error:error });
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