(
    function (){
      
  const staticForm = document.getElementById('registration-form');
  if(staticForm){
      const firstName=document.getElementById('firstName');
      const lastName=document.getElementById('lastName');
      const email=document.getElementById('email')
      const password=document.getElementById('password')
      const confirmpassword=document.getElementById('confirmPassword')


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


              let vari2=confirmpassword.value;
              if(!vari2)
              throw "no password provided"
              if(typeof(vari2)!="string")
              throw "password has to be a string"
              if(vari2.trim().length==0)
              throw "password cannot be all white spaces"
              if(((/\s/).test(vari2))==true)
              throw "password cannot have whitespaces"
              if(vari2.length<6)
              throw "password should be atleast 6 characters long"
              
              if (!testcondition.test(vari2)) 
              throw "password is not proper"


            if(vari1!==vari2)
            throw "given passwords do not match"

let vari3=firstName.value
if(!vari3)
throw "No first name provided";

if(typeof(vari3)!=="string")
throw 'first name is not a string';
if(vari3.trim().length===0)
throw "first name cant be empty or all white spaces";

vari3=vari3.trim()
vari3=vari3.toLowerCase()

if(vari3.length<2)
throw 'first name must be atleast two characters long'

let regex2 = /^[a-z ,.'-]+$/i
if(!regex2.test(vari3))
throw 'first name can only have alphabets and some some special characters'




let vari4 =lastName.value
if(!vari4)
throw "No last name provided";

if(typeof(vari4)!=="string")
throw 'last name is not a string';
if(vari4.trim().length===0)
throw "last name cant be empty or all white spaces";

vari4=vari4.trim()
vari4=vari4.toLowerCase()

if(vari4.length<2)
throw 'last name must be atleast two characters long'

if(!regex2.test(vari4))
throw 'last name can only have alphabets and some some special characters'



              staticForm.submit()
          } catch (e) {
            
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message;
            errorContainer.classList.remove('hidden');
          }
      
        });
  }
    })();