(
    function (){
      
  const staticForm = document.getElementById('login-form');
  if(staticForm){
      const email=document.getElementById('email');
      const password=document.getElementById('password');
      
     
  
     
  
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
              let vari= email.value
              if(!vari)
              throw "No email provided";
              if(typeof(vari)!=="string")
              throw 'email is not a string';
              if(vari.trim().length===0)
              throw "email cant be empty or all white spaces";
              vari=vari.trim()
              
              if(!(vari.match(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )))
              
              throw 'not proper email address'
          
              
              
              let vari1=password.value;
              if(!vari1)
              throw "no password provided"
              if(typeof(vari1)!="string")
              throw "password has to be a string"
              if(vari1.trim().length==0)
              throw "password cannot be all white spaces"
              if(((/\s/).test(vari1))==true)
              throw "password cannot have whitespaces"
              if(vari1.length<6)
              throw "password should be atleast 6 characters long"
              const testcondition = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
              if (!testcondition.test(vari1)) 
              throw "password is not proper"
              
              staticForm.submit()
          } catch (e) {
            
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message;
            errorContainer.classList.remove('hidden');
          }
      
        });
  }
    })();