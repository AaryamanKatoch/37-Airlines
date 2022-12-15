const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const path = require('path');
const helper =require('../helpers');
const { Console } = require('console');
const { type } = require('os');

//route for reviews main page

//Done
router.route("/reviews").get(async (req,res)=>{
    try{
        let isLoggedIn;
        if(req.session.user){
            isLoggedIn = true;
        }
        else{
            isLoggedIn = false
        };
        let reviews=await reviewsData.getAllReviews();
        if(reviews.length==0){
            res.status(400).render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn});
        }else{
            res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn});
        }
    }catch(e){
        res.status(400).render('error',{error:e ,title:'ridham error'});
    }
})

//Done
router.route('/reviews/add').get(async (req,res)=>{
    try{
        let isLoggedIn;
        if(req.session.user){
            isLoggedIn = true;
        }
        else{
            isLoggedIn = false
        };
        res.render('addReview',{title:'Reviews','isLoggedIn':isLoggedIn});
    }catch(e){
        res.status(400).render('error',{error:e ,title:'ridham error'});
    }
}).post(async function(req,res){
    try{
        const data=req.body;
        let review=data.review;
        let rating=data.rating;
        let username=req.session.user.email;
        //console.log('in the post of review')

        rating=Number(rating);
        rating=await helper.checkifproperrating(rating);
        review=await helper.checkifproperreview(review);
        username=await helper.checkifproperemail(username);

        const result=await reviewsData.createReview(username,review,rating);
        //console.log('****',result,'******')
        if(!result || result==null){
            res.status(400).render('error',{error:'can not add review' ,title:'can not add review'}, );
        }
        res.redirect("/reviews");
    }catch(e){
        res.status(400).render('error',{error:e ,title:'Error'});
    }
 })



module.exports = router;