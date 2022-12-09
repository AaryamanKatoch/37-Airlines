const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const path = require('path');
const helper =require('../helpers');

//route for reviews main page

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
            res.status(400).render('error',{error:'No reviews found' ,title:'No rviews Found'}, );
        }else{
            res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn});
        }
    }catch(e){
        res.status(400).render('error',{error:e ,title:'ridham error'});
    }
})

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
}).post(async (req,res)=>{
    try{
        const data=req.body;
        let review=data.review;
        let rating=data.rating;
        const username=req.session.user.email;

        rating=Number(rating);
        rating=await helper.checkifproperrating(rating);
        review=await helper.checkifproperreview(review);

        const result=await reviewsData.createReview(username,review,rating);
        if(!result){
            res.status(400).render('error',{error:'can not add review' ,title:'can not add review'}, );
        }
        res.redirect("/reviews");
    }catch(e){
        res.status(400).render('error',{error:e ,title:'ridham error'});
    }
})



module.exports = router;