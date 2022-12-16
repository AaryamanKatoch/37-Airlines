(
    function (){
      
  const staticForm = document.getElementById('userformid');
  if(staticForm){
      const fname=document.getElementById('firstnameInput');
      const lname=document.getElementById('lastnameInput');
      
     
  
     
  
      const errorContainer = document.getElementById('error-container');
      const errorTextElement = errorContainer.getElementsByClassName(
        'text-goes-here'
      )[0];
  
      staticForm.addEventListener('submit', (event) => {
          event.preventDefault();
    
          try {
            // hide containers by default
            errorContainer.classList.add('hidden');
            // Values come from inputs as strings, no matter what :(
              let vari= fname.value
              if(!vari)
              throw "No first name provided";

            if(typeof(vari)!=="string")
            throw 'name is not a string';
             if(vari.trim().length===0)
             throw "name cant be empty or all white spaces";

             vari=vari.trim()
             vari=vari.toLowerCase()
    
             if(vari.length<2)
             throw 'first name must be atleast two characters long'

           let regex1 = /^[a-z ,.'-]+$/i
           if(!regex1.test(vari))
            throw 'name can only have alphabets and some some special characters'
          


              
              let vari1=lname.value;
              if(!vari1)
              throw "No last name provided";

            if(typeof(vari1)!=="string")
            throw 'name is not a string';
             if(vari1.trim().length===0)
             throw "name cant be empty or all white spaces";

             vari1=vari1.trim()
             vari1=vari1.toLowerCase()
    
             if(vari1.length<2)
             throw 'last name must be atleast two characters long'

           let regex2 = /^[a-z ,.'-]+$/i
           if(!regex2.test(vari1))
            throw 'name can only have alphabets and some some special characters'
              
              staticForm.submit()
          } catch (e) {
          
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message;
            errorContainer.classList.remove('hidden');
          }
      
        });
  }
    })();