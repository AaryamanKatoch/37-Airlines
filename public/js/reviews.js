(function($){
    $("#addreviewform").submit(function(event){
        event.preventDefault();
        let review=$("#review").val();
        let rating=$("#rating").val();
        let errorContainer=$("#error-container");
        let errorText=$(".text-goes-here");
        
        try{
            errorContainer.addClass("hidden");
            if(!review)
            throw "review not provided";
        
            if(typeof(review)!=='string')
            throw 'review is not a string';

            if(review.trim().length===0)
            throw "review cant be empty or all white spaces";
        
            review=review.trim() 
            if(review.length<2)
            throw 'review should atleast be 2 characters long';

            if(typeof(Number(rating))!=="number")
            throw 'rating is not a number';
            
            if(!Number.isInteger(Number(rating)))
            throw "rating should be an integer"

            rating=Number(rating)

            if(rating>5 || rating<0)
            throw 'rating should be between 0 and 5'

            errorContainer.hide();

            $.ajax({
                url:'/reviews/add',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({review:review,rating:rating}),
                success: function(){
                    console.log("Connected");
                    window.location.replace('/reviews');
                },
            });

        }catch(e){
            const message = typeof e === 'string' ? e : e.message;
            errorText.text(message);
            errorContainer.removeClass('hidden');
        }
        
    })
})(window.jQuery);