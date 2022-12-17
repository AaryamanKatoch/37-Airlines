// Homepage (General) when you hit http://localhost:3000/

var dateToday = new Date();
var day = dateToday.getDate();
var month = dateToday.getMonth() + 1;
var year = dateToday.getFullYear();
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

dateToday = year + '-' + month + '-' + day;
document.getElementById("date").setAttribute("min", dateToday);


(function(){
    const staticForm = document.getElementById('searchFlightsForm');
    if(staticForm){
        const depart_airport1 = document.getElementById('depart_airport');
        const arrival_airport1 = document.getElementById('arrival_airport');
        const date1 = document.getElementById('date');
        const passengers1 = document.getElementById('passengers');
        const class1 = document.getElementById('class');

        const errorContainer = document.getElementById('error-container');
        const errorTextElement = errorContainer.getElementsByClassName(
        'text-goes-here'
        )[0];

        staticForm.addEventListener('submit', (event) => {
            event.preventDefault();

            try {
                errorContainer.classList.add('hidden');

                let depart_airport = depart_airport1.value;
                let arrival_airport = arrival_airport1.value;
                let passengers = passengers1.value;
                let class_ = class1.value;
                let date = date1.value;

                if(!depart_airport || !arrival_airport || !passengers || !date || !class_)
                throw "Please provide all details";

                if(! typeof(depart_airport) === "string") 
                throw 'Departure Airport is not a string';

                if(depart_airport.trim().length===0)
                throw "departure city cant be empty or all white spaces";
            
                depart_airport = depart_airport.trim();
                if(depart_airport.length < 2)
                throw 'Departure Airport should atleast be 2 characters long';

                if(depart_airport.length>30)
                throw "maximum length of departure Airport should be 30 characters"

                if(!(/^[A-Za-z\s]*$/.test(depart_airport)))
                throw 'Departure Airport can only have alphabets';

                if(! typeof(arrival_airport) === "string")
                throw 'Arrival Airport is not a string';

                if(arrival_airport.trim().length===0)
                throw "departure city cant be empty or all white spaces";
            
                arrival_airport = arrival_airport.trim();
                if(arrival_airport.length < 2)
                throw 'Arrival Airport should atleast be 2 characters long';

                if(arrival_airport.length>30)
                throw "maximum length of Arrival Airport should be 30 characters"

                if(!(/^[A-Za-z\s]*$/.test(arrival_airport)))
                throw 'Arrival Airport can only have alphabets'; 

                if(isNaN(passengers)) throw 'Number of passengers must be valid Number';

                if(passengers < 1 || passengers > 5) throw 'Number of passengers must be between 1 to 5';

                if(typeof(class_)!=="string")
                throw 'class name is not a string';

                if(class_.trim().length===0)
                throw "class name cant be empty or all white spaces";
            
                class_=class_.trim() 
                class_=class_.toLowerCase()

                if(class_!=="economy" && class_!=="business" && class_!=="first" && class_!=="premium economy")
                throw "please provide a valid flight class - economy,business,premium economy or first class"

                //for date validation
                if(typeof date!=='string') throw 'date must be valid string';

                if(date.trim().length==0) throw 'date can not be empty string';

                const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

                date=date.trim();

                var c_year = new Date().getFullYear();  

                var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];

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

                var today = new Date();
                var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                if(date<today_date) throw 'you can not add date which is lower than today';
                staticForm.submit();

            } catch (error) {
                const message = typeof error === 'string' ? error : error.message;
                errorTextElement.textContent = message;
                errorContainer.classList.remove('hidden');
            }

        })
    }
})();