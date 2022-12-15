

(function(){
    let staticForm = document.getElementById('formName');
    let noOfPass=sessionStorage.getItem('noOfPass');
    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0];
    
    noOfPass = parseInt(noOfPass);
    // console.log(typeof noOfPass);
    let index = [];
    for(let k = 0; k < noOfPass; k++){
        index.push(k);
    }
    if(staticForm){
        staticForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            try {
                   
                    // console.log(typeof noOfPass);
                    errorContainer.classList.add('hidden');
                    index.forEach(function(i){
                    // console.log(i);
                        let firstName = document.getElementById(`firstname${i+1}`);
                        let lastName = document.getElementById(`lastname${i+1}`);
                        let passport = document.getElementById(`passport${i+1}`);
                        let date = document.getElementById(`birthdate${i+1}`);
                        let element = document.getElementsByName(`gender${i+1}`);
                        let gender;
                        for(let j = 0; j < element.length; j++){
                            if(element[j].checked){
                                gender = element[j].value;
                            }
                        }
                        let email = document.getElementById(`email${i+1}`);
                        let mobile = document.getElementById(`mobile${i+1}`);
                        let foodchoice = document.querySelector(`#foodchoices${i+1}`);
                        let foodchoices = foodchoice.value;
                        // console.log(foodchoices);
                        //FirstName
                        firstName = firstName.value;
                        lastName = lastName.value;
                        passport = passport.value;
                        date = date.value;
                        // gender = gender.value;
                        email = email.value;
                        mobile= mobile.value;
                        // foodchoices = foodchoices.value;
                        // console.log(date);
                        // console.log(firstName.value);
                        if(!firstName)
                        throw "No firstname provided";

                        if(typeof(firstName)!=="string")
                        throw 'Firstname is not a string';
                        
                        if(firstName.trim().length===0)
                        throw "firstname cant be empty or all white spaces";

                        firstName=firstName.trim();
                        firstName=firstName.toUpperCase();
                        
                        if(firstName.length<2)
                        throw 'Firstname must be atleast two characters long';

                        let regex1 = /^[a-zA-Z]+$/i;
                        if(!regex1.test(firstName))
                        throw 'Firstname can only have alphabets';

                        //LastName
                        if(!lastName)
                        throw "No Lastname provided";

                        if(typeof(lastName)!=="string")
                        throw 'Lastname is not a string';
                        
                        if(lastName.trim().length===0)
                        throw "lastname cant be empty or all white spaces";

                        lastName=lastName.trim();
                        lastName=lastName.toUpperCase();
                        
                        if(lastName.length<2)
                        throw 'Lastname must be atleast two characters long';

                        let regex2 = /^[a-zA-Z]+$/i;
                        if(!regex2.test(lastName))
                        throw 'Lastname can only have alphabets';
                        
                        //Passport

                        if(!passport)
                        throw "No passport number provided";
                        if(passport==="000000000")
                        throw "invalid passport number"
                    
                        if(typeof(passport)!=="string")
                        throw 'passport number is not a string';
                        if(passport.trim().length===0)
                        throw "passport number can't be empty or all white spaces";
                    
                        passport=passport.trim()
                        if(/\s/g.test(passport))
                        throw "passport number can't have spaces"
                    
                        if(passport.length!==9)
                        throw "length of passport number should be 9"
                    
                        for(i=0;i<passport.length;i++){
                            if(!(Number.isInteger(Number(passport[i])) && Number(passport[i])>=0 && Number(passport[i])<=9))
                            throw 'invalid passport number'
                        }

                        //BirthDate
                        if(!date) throw 'No date passed';
        
                        if(typeof date !=='string') throw 'date must be valid string';
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
                        const today = new Date();
                        // console.log(today);
                        let selectedDate = new Date(date);
                        // console.log(selectedDate);
                        selectedDate.setDate(selectedDate.getDate()+1) ;
                        if(selectedDate > today) throw 'Date should be less than current date';
                        

                        //Gender
                        if(!gender)
                        throw "No gender provided";
                        if(typeof(gender)!=="string")
                        throw 'gender is not a string';
                        if(gender.trim().length===0)
                        throw "gender cant be empty or all white spaces";
                        gender=gender.trim();
                        gender=gender.toLowerCase();
                        // console.log(gender);
                        if(gender!=="male" && gender!=="female")
                        throw 'kindly select from: male,female';

                        //Email
                        if(!email)
                        throw "No email provided";
                        if(typeof(email)!=="string")
                        throw 'email is not a string';
                        if(email.trim().length===0)
                        throw "email cant be empty or all white spaces";
                        email=email.trim()
                        
                        if(!(email.match(
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )))
                        
                        throw 'not proper email address';
                        
                        //Phone Number

                        if(!mobile)
                        throw "No phone number provided";
                        if(mobile==="0000000000")
                        throw "invalid phone number"
                        if(typeof(mobile)!=="string")
                        throw 'phone number is not a string';
                        if(mobile.trim().length===0)
                        throw "phone number cant be empty or all white spaces";
                    
                        mobile=mobile.trim()
                        if(/\s/g.test(mobile))
                        throw "phone number cant have spaces"
                    
                        if(mobile.length!==10)
                        throw "length of phone number should be 10"
                    
                        for(i=0;i<mobile.length;i++){
                            if(!(Number.isInteger(Number(mobile[i])) && Number(mobile[i])>=0 && Number(mobile[i])<=9))
                            throw 'invalid phone number'
                    
                        }

                        //Foodchoices
                        if(!foodchoices)
                        throw "food choices not provided";
                        if(typeof(foodchoices)!=="string")
                        throw 'choice should be a string';
                        //console.log(curfood)
                        foodchoices=foodchoices.trim()
                        foodchoices=foodchoices.toLowerCase()
                        //console.log(curfood)
                        if(foodchoices.length===0)
                        throw 'choice cant be empty or all white spaces';
                
                        if(!foodchoices.match(/^[A-Za-z\s]*$/))  
                        throw 'choice should only be a string of alphabets';                        
                
                        if(foodchoices.length>30)
                        throw "food choice name is too long, ask the chef to change name";
                        
                    });
                    staticForm.submit();
                    
            } catch (e) {
                const message = typeof e === 'string' ? e : e.message;
                errorTextElement.textContent = message;
                errorContainer.hidden=false;
            }
            
        });
    }
})();