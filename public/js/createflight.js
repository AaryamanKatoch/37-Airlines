var dateToday = new Date();
var day = dateToday.getDate();
var month = dateToday.getMonth() + 1;
var year = dateToday.getFullYear();

/*
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

dateToday = year + '-' + month + '-' + day;
document.getElementById("dept_date").setAttribute("min", dateToday);
document.getElementById("arrival_date").setAttribute("min", dateToday);
*/


/*
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
*/
(
    function (){
      
  const staticForm = document.getElementById('addFlightForm');
  if(staticForm){
      const fcode=document.getElementById('flight_code');
      const departure=document.getElementById('departure');
      const arrival=document.getElementById('arrival')
      const deptdate=document.getElementById('dept_date')
      const depttime=document.getElementById('dept_time')
      const arrivaldate=document.getElementById('arrival_date')
      const arrivaltime=document.getElementById('arrival_time')
     
      const miles=document.getElementById('miles')
      const firstnumber=document.getElementById('ft_seats')
      const firstfood=document.getElementById('ft_food_options')
      const firstprice=document.getElementById('ft_price')
      const businessnumber=document.getElementById('bs_seats')
      const businessfood=document.getElementById('bs_food_options')
      const businessprice=document.getElementById('bs_price')
      const economynumber=document.getElementById('ec_seats')
      const economyfood=document.getElementById('ec_food_options')
      const economyprice=document.getElementById('ec_price')
      
     
  
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
              let vari= fcode.value
              const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
              if(!vari)
              throw "No flight code provided";
          
              if(typeof(vari)!=="string")
              throw 'flight code is not a string';
              if(vari.trim().length===0)
              throw "flight code cant be empty or all white spaces";
          
              vari=vari.trim()
              vari=vari.toLowerCase()
          
              if(!isAlphaNumeric(vari))
              throw "flight code can have only alphanumeric value"
            
              if(!vari[0].match(/[a-z]/i))
              throw "first character of flight code should be an alphabet"
              
              if(vari.length<2)
              throw "minimum length of flight code  should be two"
          
              if(vari.length>6)
              throw "maximum length of flight code is 6 "

              let vari1=departure.value
              if(!vari1)
              throw "No departure  is provided";
              if(typeof(vari1)!=="string")
              throw 'departure  is not a string';
              if(vari1.trim().length===0)
              throw "departure  city cant be empty or all white spaces";
          
              vari1=vari1.trim()
              vari1=vari1.toLowerCase()
          
              if(!(/^[A-Za-z\s]*$/.test(vari1)))
              throw 'city can only have alphabets'
          
              if(vari1.length<2)
              throw "minimum length of  departure city should be two"
          
              if(vari1.length>30)
              throw "maximum length of  departure city should be 30 "

            let vari2=arrival.value
            if(!vari2)
            throw "No departure or arrival city is provided";
            if(typeof(vari2)!=="string")
            throw 'departure or arrival is not a string';
            if(vari2.trim().length===0)
            throw "departure or arrival city cant be empty or all white spaces";
        
            vari2=vari2.trim()
            vari2=vari2.toLowerCase()
        
            if(!(/^[A-Za-z\s]*$/.test(vari2)))
            throw 'city can only have alphabets'
        
            if(vari2.length<2)
            throw "minimum length of arrival and departure cities  should be two"
        
            if(vari2.length>30)
            throw "maximum length of arrival and departure cities should be 30 "

            let date=deptdate.value
            if(!date) throw 'No date passed';
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
             
            let vari11=depttime.value
            if(!vari11)
            throw "No departure time is provided";
         
            if(typeof(vari11)!=="string")
            throw 'departure time is not a string';
            if(vari11.trim().length===0)
            throw "departure time cant be empty or all white spaces";
         
            vari11=vari11.trim()
         
            let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
            if (!regex.test(vari11))
            throw 'not proper departure time format'

            let adate=arrivaldate.value
            if(!adate) throw 'No date passed';
            if(typeof adate!=='string') throw 'date must be valid string';
            if(adate.trim().length==0) throw 'date can not be empty string';
           
            adate=adate.trim();
            var c_year = new Date().getFullYear();  
            var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            arr=adate.split('-');
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


            let vari21=arrivaltime.value
            if(!vari21)
            throw "No arrival time is provided";
         
            if(typeof(vari21)!=="string")
            throw 'arrival time is not a string';
            if(vari21.trim().length===0)
            throw "arrival time cant be empty or all white spaces";
         
            vari21=vari21.trim()
         
            if (!regex.test(vari21))
            throw 'not proper arrival time format'

            
            let vari31=miles.value
            if(!vari31)
            throw "miles not provided";
         
            if(typeof(vari31)!=="string")
            throw 'miles is not a string';
            if(vari31.trim().length===0)
            throw "miles cant be empty or all white spaces";
         
            vari31=vari31.trim() 
            if(!(Number.isInteger(Number(vari31)) && Number(vari31) > 1 && Number(vari31)<9538))
            throw "not proper miles , should be an integer between 1 and 9538"
            

            let fnum=firstnumber.value
            if(!fnum)
            throw "first class seat number is not provided";
         
            if(typeof(fnum)!=="string")
            throw 'first class seat number is not a string';
            if(fnum.trim().length===0)
            throw "first class seat number cant be empty or all white spaces";
         
            fnum=fnum.trim() 
            if(!(Number.isInteger(Number(fnum)) && Number(fnum) >= 0 && Number(fnum)<11))
            throw "first class seat number should be an integer between 0 and 10"

            let bnum=businessnumber.value
            if(!bnum)
            throw "business class seat number is not provided";
         
            if(typeof(bnum)!=="string")
            throw 'business class seat number is not a string';
            if(bnum.trim().length===0)
            throw "business class seat number cant be empty or all white spaces";
         
            bnum=bnum.trim() 
            if(!(Number.isInteger(Number(bnum)) && Number(bnum) >= 0 && Number(bnum)<31))
            throw "business class seat number should be an integer between 0 and 30"

            let ecnum=economynumber.value
            if(!ecnum)
            throw "economy class seat number is not provided";
         
            if(typeof(ecnum)!=="string")
            throw 'economy class seat number is not a string';
            if(ecnum.trim().length===0)
            throw "economy class seat number cant be empty or all white spaces";
         
            ecnum=ecnum.trim() 
            if(!(Number.isInteger(Number(ecnum)) && Number(ecnum) >= 0 && Number(ecnum)<201))
            throw "economy class seat number should be an integer between 0 and 200"

            

            let fprice=firstprice.value
            if(!fprice)
            throw "first class price not provided";
         
            if(typeof(fprice)!=="string")
            throw 'first class price is not a string';
            if(fprice.trim().length===0)
            throw "first class price cant be empty or all white spaces";
         
            fprice=fprice.trim() 
            if(!(Number.isInteger(Number(fprice)) && Number(fprice) > 1 && Number(fprice)<1000000))
            throw "not proper first class price , should be an integer between 1 and 1000000 "

            let bprice=businessprice.value
            if(!bprice)
            throw "business class price not provided";
         
            if(typeof(bprice)!=="string")
            throw 'business class price is not a string';
            if(bprice.trim().length===0)
            throw "business class price cant be empty or all white spaces";
         
            bprice=bprice.trim() 
            if(!(Number.isInteger(Number(bprice)) && Number(bprice) > 1 && Number(bprice)<1000000))
            throw "not proper business class price , should be an integer between 1 and 1000000 "


            let eprice=economyprice.value
            if(!eprice)
            throw "economy class price not provided";
         
            if(typeof(eprice)!=="string")
            throw 'economy class price is not a string';
            if(eprice.trim().length===0)
            throw "economy class price cant be empty or all white spaces";
         
            eprice=eprice.trim() 
            if(!(Number.isInteger(Number(eprice)) && Number(eprice) > 1 && Number(eprice)<1000000))
            throw "not proper economy class price , should be an integer between 1 and 1000000 "

            
            let ffood=firstfood.value
            if(!ffood)
            throw 'no first class food option provided'
            ffood=ffood.trim()
            let vari12=ffood.split(",")
            if(!vari12)
            throw "first class food choices not provided";
         
            if(!Array.isArray(vari12))
            throw 'first class food choices is not in proper format';
            
            if(!vari12.length>0)
            throw 'first class food choicescant be empty'
        
            for(i=0;i<vari12.length;i++){
                //console.log(vari[i])
                if(typeof(vari12[i])!=="string")
                throw 'first class choice should be a string'
                //console.log(curfood)
                vari12[i]=vari12[i].trim()
                vari12[i]=vari12[i].toLowerCase()
                //console.log(curfood)
                if(vari12[i].length===0)
                throw 'first class choice cant be empty or all white spaces'
        
                for(j=0;j<vari12[i].length;j++){
                    if(!vari12[i][j].match(/^[A-Za-z\s]*$/))  
                    throw 'first class choice should only be a string of alphabets'
                }
        
                if(vari12[i].length>30)
                throw "first class food choice name is too long, ask the chef to change name"
                }

                let bfood=businessfood.value
                if(!bfood)
                throw "no business class food choice provided"
                bfood=bfood.trim()
                let vari22=bfood.split(",")
        
                if(!vari22)
                throw "business class food choices not provided";
             
                if(!Array.isArray(vari22))
                throw 'business class food choices is not in proper format';
                
                if(!vari22.length>0)
                throw 'business class food choicescant be empty'
            
                for(i=0;i<vari22.length;i++){
                    //console.log(vari[i])
                    if(typeof(vari22[i])!=="string")
                    throw 'business class choice should be a string'
                    //console.log(curfood)
                    vari22[i]=vari22[i].trim()
                    vari22[i]=vari22[i].toLowerCase()
                    //console.log(curfood)
                    if(vari22[i].length===0)
                    throw 'business class choice cant be empty or all white spaces'
            
                    for(j=0;j<vari22[i].length;j++){
                        if(!vari22[i][j].match(/^[A-Za-z\s]*$/))  
                        throw 'business class choice should only be a string of alphabets'
                    }
            
                    if(vari22[i].length>30)
                    throw "business class food choice name is too long, ask the chef to change name"
                    }

                    let efood=economyfood.value
                    if(!efood)
                    throw "no economy class food choice provided"
                    efood=efood.trim()
                    let vari32=efood.split(",")
            
                    if(!vari32)
                    throw "economy class food choices not provided";
                 
                    if(!Array.isArray(vari32))
                    throw 'economy class food choices is not in proper format';
                    
                    if(!vari32.length>0)
                    throw 'economy class food choicescant be empty'
                
                    for(i=0;i<vari32.length;i++){
                        //console.log(vari[i])
                        if(typeof(vari32[i])!=="string")
                        throw 'economy class choice should be a string'
                        //console.log(curfood)
                        vari32[i]=vari32[i].trim()
                        vari32[i]=vari32[i].toLowerCase()
                        //console.log(curfood)
                        if(vari32[i].length===0)
                        throw 'economy class choice cant be empty or all white spaces'
                
                        for(j=0;j<vari32[i].length;j++){
                            if(!vari32[i][j].match(/^[A-Za-z\s]*$/))  
                            throw 'economy class choice should only be a string of alphabets'
                        }
                
                        if(vari32[i].length>30)
                        throw "economy class food choice name is too long, ask the chef to change name"
                        }
          const dddate=new Date(date)
          const aadate=new Date(adate)

          var today=new Date()
          var today = new Date();var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          if(dddate<today)
          throw "cannot add flights in the past or for the same day"


          if(aadate<dddate)
          throw 'arrival date cannot be before departure'
          
          if(date==adate){
            console.log("here")
            if(vari11>vari21){
          throw "arrival time cannot be before departure"
            }
          }
        
         





            staticForm.submit()
          } catch (e) {
          
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message;
            errorContainer.classList.remove('hidden');
          }
      
        });
        
  }
    })();