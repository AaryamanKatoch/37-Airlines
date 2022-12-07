const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const path = require('path');

//route for reviews main page

router.route("/reviews").get(async (req,res)=>{
    try{
        //error handeling
        let reviews=await reviewsData.getAllReviews();
        if(reviews.length==0){
            res.status(400).render('error',{error:'No reviews found' ,title:'No rviews Found'}, );
        }else{
            res.render('reviews',{review : reviews,title:'Reviews'});
        }
    }catch(e){
        res.status(400).render('error',{error:e ,title:'ridham error'});
    }
})



module.exports = router;