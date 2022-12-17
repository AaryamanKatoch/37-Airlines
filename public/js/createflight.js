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
document.getElementById("dept_date").setAttribute("min", dateToday);
document.getElementById("arrival_date").setAttribute("min", dateToday);

// var maxArriveDate = new Date(dateToday.getTime());
// maxArriveDate.setDate(dateToday.getDate + 10);

// var hour = dateToday.getHours();
// hour = await helper.addDigitIfNeeded(hour.toString());
// var minute = dateToday.getMinutes();
// minute = await helper.addDigitIfNeeded(minute.toString());
// var currentTime = hour.toString() + ':' + minute.toString();
// document.getElementById("dept_time").setAttribute("min", currentTime);


(function($){
    $("#addFlightForm").submit(function(event){
        event.preventDefault();
        let flight_code = $("#flight_code").val();
        let departure = $("#departure").val();
        let arrival = $("#arrival").val();
        let dept_date = $("#dept_date").val();
        let dept_time = $("#dept_time").val();
        let arrival_date = $("#arrival_date").val();
        let arrival_time = $("#arrival_time").val();
        let flight_duration = $("#flight_duration").val();
        let miles = $("#miles").val();
        let ft_seats = $("#ft_seats").val();
        let bs_seats = $("#bs_seats").val();
        let ec_seats = $("#ec_seats").val();
        let ft_food_options = $("#ft_food_options").val();
        let bs_food_options = $("#bs_food_options").val();
        let ec_food_options = $("#ec_food_options").val();
        let ft_price = $("#ft_price").val();
        let bs_price = $("#bs_price").val();
        let ec_price = $("#ec_price").val();

        let errorContainer = $("#error-container");
        let errorText = $(".text-goes-here");

        try {
            errorContainer.addClass("hidden");

            if(!flight_code || !departure || !arrival || !dept_date || !dept_time || !arrival_date || !arrival_time 
                || !flight_duration || !miles || !ft_seats || !bs_seats || !ec_seats)
            throw "Please provide all details";

            if(ec_seats !== '0' && (!ec_food_options.length > 0 || !ec_price)) throw "Please provide all details";
            if(bs_seats !== '0' && (!bs_food_options.length > 0 || !bs_price)) throw "Please provide all details";
            if(ft_seats !== '0' && (!ft_food_options.length > 0 || !ft_price)) throw "Please provide all details";
            
            if(new Date(arrival_date) < new Date(dept_date)) throw "Arrival Date should be later than Departure Date";
            if(ec_seats === '0' && (ec_food_options.length > 0 || ec_price)) 
            throw "Cannot provide food options/price for flight classes having 0 seats";
            if(bs_seats === '0' && (bs_food_options.length > 0 || bs_price)) 
            throw "Cannot provide food options/price for flight classes having 0 seats";
            if(ft_seats === '0' && (ft_food_options.length > 0 || ft_price)) 
            throw "Cannot provide food options/price for flight classes having 0 seats";

            // var strDeptDate = deptDate.toString();
            // var temp = new Date(strDeptDate);
            // console.log(temp); // Output => Thu Dec 15 2022 19:00:00 GMT-0500 (Eastern Standard Time)

            // var yearDD = Number(strDeptDate.substring(0,4));
            // var monthDD = Number(strDeptDate.substring(5,7)) - 1;
            // var dayDD = Number(strDeptDate.substring(8));
            // var temp = new Date(yearDD,monthDD,dayDD);
            //console.log(temp);

            // Trying to create date +10 days of temp
            // This work perfectly when temp = new Date(); but here temp is different
            // var maxArriveDate = new Date(temp.getTime());
            // maxArriveDate.setDate(temp.getDate + 10);
            // console.log(maxArriveDate);
            
            // if(new Date(arrDate) > new Date(maxArriveDate)) throw "Arrival Date should be within 10 days of Departure Date"

            errorContainer.hide();

            $.ajax({
                url:'/admin/addflight',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({flight_code:flight_code, departure:departure, arrival:arrival, dept_date: dept_date, 
                    dept_time:dept_time, arrival_date:arrival_date, arrival_time:arrival_time, flight_duration:flight_duration, 
                    miles:miles, ft_seats:ft_seats, bs_seats:bs_seats, ec_seats:ec_seats, ft_food_options:ft_food_options,
                    bs_food_options:bs_food_options, ec_food_options:ec_food_options, ft_price:ft_price, bs_price:bs_price, ec_price:ec_price}),
                success: function(){
                    console.log("Connected");
                    window.location = '/admin';
                },
            });

        } catch (error) {
            const message = typeof error === 'string' ? error : error.message;
            errorText.text(message);
            errorContainer.removeClass('hidden');
        }

    })
})(window.jQuery);