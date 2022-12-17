const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const path = require('path');
const helper =require('../helpers');
const { Console } = require('console');
const { type } = require('os');
const flightData = require('../data/flights.js');
const userData=require('../data/usersCollection.js');
const bookingData=require('../data/bookingCollection.js');
const xss = require('xss');

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
            res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn,noReviews:true});
        }else{
            res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn,noReviews:false});
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
        let username=req.session.user.email;
        username=await helper.checkifproperemail(username);
        let userinfo=await userData.getUserByEmail(username);
        if(!userinfo){
            throw 'can not find the user!!!!';
        }
        let data=await userData.getUserByEmail(username);
        if(!data.bookingHistory){
            req.session.canNotAddReview=true
            return res.redirect("/reviews");
            //res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn,noReviews:false,canNotAddReview:true});
            //return alert('You can not add review now!\n You must have completed atleast one flight');
            //return res.json({'error':'can add review now!'})
        }
        else if(data.bookingHistory.length === 0){
            req.session.canNotAddReview=true
            return res.redirect("/reviews");
            //res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn,noReviews:false,canNotAddReview:true});
            //return alert('You can not add review now!\n You must have completed atleast one flight');
            //return res.json({'error':'can add review now!'})
        }
        let bul= await reviewsData.check_if_user_can_add_review(data.bookingHistory);
        if(bul==true){
            res.render('addReview',{title:'Add Reviews','isLoggedIn':isLoggedIn});
        }else{
            req.session.canNotAddReview=true
            return res.redirect("/reviews");
            //res.render('reviews',{review : reviews,title:'Reviews','isLoggedIn':isLoggedIn,noReviews:false,canNotAddReview:true});
            //res.json({'error':'can add review now!'})
        }
        //res.render('addReview',{title:'Reviews','isLoggedIn':isLoggedIn});
    }catch(e){
        res.status(400).render('error',{error:e ,title:'Error'});
    }
}).post(async function(req,res){
    try{
        const data=req.body;
        let review=xss(data.review);
        let rating=xss(data.rating);
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
        //res.status(400).render('error',{error:'render from post review add' ,title:'ridham error'});
    }catch(e){
        res.status(400).render('error',{error:e ,title:'Error'});
    }
 })



module.exports = router;