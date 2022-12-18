(
    function (){
      
  const staticForm = document.getElementById('updatereviewform');
  if(staticForm){
      const review1=document.getElementById('review');
      const rating1=document.getElementById('rating');
        
      const errorContainer = document.getElementById('error-container');
      const errorTextElement = errorContainer.getElementsByClassName(
        'text-goes-here'
      )[0];
  
      staticForm.addEventListener('submit', (event) => {
          event.preventDefault();
    
          try {
            // hide containers by default
            errorContainer.classList.add('hidden');
            let review=review1.value
            if(!review)
            throw "review not provided";
        
            if(typeof(review)!=='string')
            throw 'review is not a string';

            if(review.trim().length===0)
            throw "review cant be empty or all white spaces";
        
            review=review.trim() 
            if(review.length<2)
            throw 'review should atleast be 2 characters long';

            let rating=rating1.value

            if(typeof(Number(rating))!=="number")
            throw 'rating is not a number';
            
            if(!Number.isInteger(Number(rating)))
            throw "rating should be an integer Number"

            rating=Number(rating)

            if(rating>5 || rating<=0)
            throw 'rating should be between 0 and 5'
            staticForm.submit()

          } catch (e) {
          
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message;
            errorContainer.classList.remove('hidden');
          }
      
        });
        
  }
    })();