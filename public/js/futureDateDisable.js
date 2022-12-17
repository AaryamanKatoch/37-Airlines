let today = new Date();
let month = today.getMonth()+1; 
let year = today.getFullYear();
let day = today.getDate();
month = (month<10)?("0"+month) : month;
day = (day<10)?("0"+day) : day;

var maxDate = year + "-" + month + "-" + day;
let noOfPass=sessionStorage.getItem('noOfPass');
noOfPass = parseInt(noOfPass);
for(let i = 0; i < noOfPass; i++){
    document.getElementById(`birthdate${i+1}`).setAttribute("max", maxDate);
}

// console.log(maxDate);