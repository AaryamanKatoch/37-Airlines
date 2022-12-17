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
            
                depart_airport = depart_airport.trim() ;
                if(depart_airport.length < 2)
                throw 'Departure Airport should atleast be 2 characters long';

                if(!(/^[A-Za-z\s]*$/.test(depart_airport)))
                throw 'Departure Airport can only have alphabets';

                if(! typeof(arrival_airport) === "string")
                throw 'Arrival Airport is not a string';
            
                arrival_airport = arrival_airport.trim();
                if(arrival_airport.length < 2)
                throw 'Arrival Airport should atleast be 2 characters long';

                if(!(/^[A-Za-z\s]*$/.test(arrival_airport)))
                throw 'Arrival Airport can only have alphabets';
                
                staticForm.submit();

            } catch (error) {
                const message = typeof error === 'string' ? error : error.message;
                errorTextElement.textContent = message;
                errorContainer.classList.remove('hidden');
            }

        })
    }
})();