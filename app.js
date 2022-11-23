const express = require('express');
const app = express();

const configRoutes = require('./routes');
const exphbars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var hbs = exphbars.create({});
var hbs1 = exphbars.create({});
hbs.handlebars.registerHelper('for', function(n,m,block) {
    var num = '';
    n = parseInt(n);   
    
    for(var i = 0; i < n; i++){
      num += block.fn({noOfForms : i+1,foodItems : m});
    }
        
    return num ;
});

hbs1.handlebars.registerHelper('foodChoice', function(n, block) {
  var num = '';
   n = parseInt(n);
  for(var i = 0; i < n; i++)
      num += block.fn(i+1);
  return num;
});

configRoutes(app);

app.listen(3000, () => {
    console.log("Server ON!!");
    console.log("Your routes will be running on http://localhost:3000");
});