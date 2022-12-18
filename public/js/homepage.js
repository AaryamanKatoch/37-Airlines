


(
  function (){
    
const staticForm = document.getElementById('adminformid');
if(staticForm){
    const fcode=document.getElementById('flightcodeInput');
    const depar=document.getElementById('departureInput');
    const arri=document.getElementById('arrivalInput');
    const depardate=document.getElementById('departureDateInput');
    const departim=document.getElementById('departimeInput');
   const arrivaldate=document.getElementById('arrivalDateInput')
    const arritim=document.getElementById('arrTimeInput');
    
    const mil=document.getElementById('milesInput');
   

   

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
            let fcodeval= fcode.value;
            if(!fcodeval)
            throw "No flight code provided";
        
            if(typeof(fcodeval)!=="string")
            throw 'flight code is not a string';
            if(fcodeval.trim().length===0)
            throw "flight code cant be empty or all white spaces";
        
            fcodeval=fcodeval.trim()
            fcodeval=fcodeval.toUpperCase()
            const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
            if(!isAlphaNumeric(fcodeval))
            throw "flight code can have only alphanumeric value"
          
            if(!fcodeval[0].match(/[a-z]/i))
            throw "first character of flight code should be an alphabet"
            
            if(fcodeval.length<2)
            throw "minimum length of flight code  should be two"
        
            if(fcodeval.length>6)
            throw "maximum length of flight code is 6 "
        
            
            let deparval=depar.value;
            if(!deparval)
            throw "No departure or arrival city is provided";
        
            if(typeof(deparval)!=="string")
            throw 'departure or arrival is not a string';
            if(deparval.trim().length===0)
            throw "departure or arrival city cant be empty or all white spaces";
        
            deparval=deparval.trim()
            deparval=deparval.toUpperCase()
        
            if(!(/^[A-Za-z\s]*$/.test(deparval)))
            throw 'city can only have alphabets'
        
            if(deparval.length<2)
            throw "minimum length of arrival and departure cities  should be two"
        
            if(deparval.length>30)
            throw "maximum length of arrival and departure cities should be 6 "
        
    


            let arrival=arri.value;
            if(!arrival)
            throw "No departure or arrival city is provided";
        
            if(typeof(arrival)!=="string")
            throw 'departure or arrival is not a string';
            if(arrival.trim().length===0)
            throw "departure or arrival city cant be empty or all white spaces";
        
            arrival=arrival.trim()
            arrival=arrival.toUpperCase()
        
            if(!(/^[A-Za-z\s]*$/.test(arrival)))
            throw 'city can also have alphabets'
        
            if(arrival.length<2)
            throw "minimum length of arrival and departure cities  should be two"
        
            if(arrival.length>30)
            throw "maximum length of arrival and departure cities should be 6 "
        
            

//departure date

           let date=depardate.value;
           if(!date) throw 'No date passed';
          
           if(typeof date!=='string') throw 'date must be valid string';
           if(date.trim().length==0) throw 'date can not be empty string';
           const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
           date=date.trim();
           var c_year = new Date().getFullYear();  
           var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
           let arr=date.split('-');
           if(arr.length !== 3){
               throw 'invalid Date';
           }
           month=arr[1];
           day=arr[2];
           year=arr[0];
       
           if(month.length!==2 || day.length!==2 || year.length!==4){
               throw 'invalid Date';
           }
           if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
               throw 'invalid Date';
           }
           month= Number(month);
           day= Number(day);
           year= Number(year);
           if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
               throw 'invalid Date';
           }
           if(month<0 || month>12){
               throw 'invalid Date';
           }
           if(month==2){
               if(day>28){
                   throw 'invalid Date';
               }
           }
           if(day>ListofDays[month-1]){
               throw 'invalid Date';
           }
           


            let departimval=departim.value;
            if(!departimval)
            throw "No arrival or departure time is provided";
         
            if(typeof(departimval)!=="string")
            throw 'departure or arrival time is not a string';
            if(departimval.trim().length===0)
            throw "departure or arrival time cant be empty or all white spaces";
         
            departimval=departimval.trim()
         
            let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
            if (!regex.test(departimval))
            throw 'not proper arrival/departure time format'



//arrival date
let date1=arrivaldate.value;
if(!date1) throw 'No date passed';

if(typeof date1!=='string') throw 'date must be valid string';
if(date1.trim().length==0) throw 'date can not be empty string';
date1=date1.trim();
c_year = new Date().getFullYear();  

 arr=date.split('-');
if(arr.length !== 3){
    throw 'invalid Date';
}
month=arr[1];
day=arr[2];
year=arr[0];

if(month.length!==2 || day.length!==2 || year.length!==4){
    throw 'invalid Date';
}
if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
    throw 'invalid Date';
}
month= Number(month);
day= Number(day);
year= Number(year);
if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
    throw 'invalid Date';
}
if(month<0 || month>12){
    throw 'invalid Date';
}
if(month==2){
    if(day>28){
        throw 'invalid Date';
    }
}
if(day>ListofDays[month-1]){
    throw 'invalid Date';
}     






            let arritimval=arritim.value;
            if(!arritimval)
            throw "No arrival or departure time is provided";
         
            if(typeof(arritimval)!=="string")
            throw 'departure or arrival time is not a string';
            if(arritimval.trim().length===0)
            throw "departure or arrival time cant be empty or all white spaces";
         
            arritimval=arritimval.trim()
         
            if (!regex.test(arritimval))
            throw 'not proper arrival/departure time format'

          
          //duration function is left

            let milval=mil.value;

            if(!milval)
            throw "miles not provided";
         
            if(typeof(milval)!=="string")
            throw 'miles is not a string';
            if(milval.trim().length===0)
            throw "miles cant be empty or all white spaces";
         
            milval=milval.trim() 
            if(!(Number.isInteger(Number(milval)) && Number(milval) > 1 && Number(milval)<9538))
            throw "not proper miles , should be an integer between 1 and 9538"
            

            
            let ddate=new Date(date)
            var today=new Date()
            var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            if(ddate<today)
            throw "cannot add flights in the past or for the same day"
  
  
            if(date1<date)
            throw 'arrival date cannot be before departure'
          
            if(date==date1){
           
              if(departimval>arritimval){
               
            throw "arrival time cannot be before departure"
              }
            }

        
           staticForm.submit()
        } catch (e) {
            errorContainer.classList.remove('hidden');
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = message;
          //errorContainer.hidden=false;
          errorContainer.classList.remove('hidden');
        }
    
      });
}
  })();
