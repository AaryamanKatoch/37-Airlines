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


(function($){
    $("#searchFlightsForm").submit(function(event){
        event.preventDefault();
        let depart_airport = $("#depart_airport").val();
        let arrival_airport = $("#arrival_airport").val();
        let date = $("#date").val();
        let passengers = $("#passengers").val();
        let class_ = $("#class").val();

        let errorContainer = $("#error-container");
        let errorText = $(".text-goes-here");

        try {
            errorContainer.addClass("hidden");

            if(!depart_airport || !arrival_airport || !passengers || !date || !class_)
            throw "Please provide all details";

            if(typeof(depart_airport)!=='string')
            throw 'Departure Airport is not a string';

            if(depart_airport.trim().length===0)
            throw "Departure Airport should not be empty or all white spaces";
        
            depart_airport = depart_airport.trim() 
            if(depart_airport.length < 2)
            throw 'Departure Airport should atleast be 2 characters long';

            if(typeof(arrival_airport)!=='string')
            throw 'Arrival Airport is not a string';

            if(arrival_airport.trim().length===0)
            throw "Arrival Airport should not be empty or all white spaces";
        
            arrival_airport = arrival_airport.trim() 
            if(arrival_airport.length < 2)
            throw 'Arrival Airport should atleast be 2 characters long';

            errorContainer.hide();

            $.ajax({
                url:'/searchflights',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({depart_airport:depart_airport, arrival_airport:arrival_airport, date:date, passengers:passengers, class:class_}),
                success: function(){
                    console.log("Connected");
                    window.location = '/searchflights';
                },
            });

        } catch (error) {
            const message = typeof error === 'string' ? error : error.message;
            errorText.text(message);
            errorContainer.removeClass('hidden');
        }

    })
})(window.jQuery);