


(
  function (){
    
const staticForm = document.getElementById('adminformid');
if(staticForm){
    const fcode=document.getElementById('flightcodeInput');
    const depar=document.getElementById('departureInput');
    const arri=document.getElementById('arrivalInput');
    const departim=document.getElementById('departimeInput');
    const arritim=document.getElementById('arrTimeInput');
    const dura=document.getElementById('durationInput');
    const mil=document.getElementById('milesInput');
    const dat=document.getElementById('dateInput');

   

    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0];

    staticForm.addEventListener('submit', (event) => {
        event.preventDefault();
    console.log(here)
        try {
          // hide containers by default
          errorContainer.classList.add('hidden');
          // Values come from inputs as strings, no matter what :(
            const fcodeval= fcode.value;
            if(!fcodeval)
            throw "No flight code provided";
        
            if(typeof(fcodeval)!=="string")
            throw 'flight code is not a string';
            if(vari.trim().length===0)
            throw "flight code cant be empty or all white spaces";
        
            fcodeval=fcodeval.trim()
            fcodeval=fcodeval.toUpperCase()
        
            if(!isAlphaNumeric(fcodeval))
            throw "flight code can have only alphanumeric value"
          
            if(!fcodeval[0].match(/[a-z]/i))
            throw "first character of flight code should be an alphabet"
            
            if(fcodeval.length<2)
            throw "minimum length of flight code  should be two"
        
            if(fcodeval.length>6)
            throw "maximum length of flight code is 6 "
        
            
            const deparval=depar.value;
            if(!deparval)
            throw "No departure or arrival city is provided";
        
            if(typeof(deparval)!=="string")
            throw 'departure or arrival is not a string';
            if(deparval.trim().length===0)
            throw "departure or arrival city cant be empty or all white spaces";
        
            deparval=deparval.trim()
            deparval=deparval.toUpperCase()
        
            if(!(/^[A-Za-z\s]*$/.test(deparval)))
            throw 'city can also have alphabets'
        
            if(deparval.length<2)
            throw "minimum length of arrival and departure cities  should be two"
        
            if(deparval.length>30)
            throw "maximum length of arrival and departure cities should be 6 "
        
    


            const arrival=arri.value;
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
        

            const departimval=departim.value;
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


            const arritimval=arritim.value;
            if(!arritimval)
            throw "No arrival or departure time is provided";
         
            if(typeof(arritimval)!=="string")
            throw 'departure or arrival time is not a string';
            if(arritimval.trim().length===0)
            throw "departure or arrival time cant be empty or all white spaces";
         
            arritimval=arritimval.trim()
         
            if (!regex.test(arritimval))
            throw 'not proper arrival/departure time format'

            const duraval=dura.value;


            const milval=mil.value;

            if(!milval)
            throw "miles not provided";
         
            if(typeof(milval)!=="string")
            throw 'miles is not a string';
            if(milval.trim().length===0)
            throw "miles cant be empty or all white spaces";
         
            milval=milval.trim() 
            if(!(Number.isInteger(Number(milval)) && Number(milval) > 1 && Number(milval)<9538))
            throw "not proper miles , should be an integer between 1 and 9538"
            const datval=dat.value;
          
        } catch (e) {
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
        }
      });
}
  })();
