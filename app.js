const express = require('express');
const app = express();
const session = require('express-session');

const configRoutes = require('./routes');
const exphbars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



const static = express.static(__dirname + '/public');
app.use;
app.use('/public',static);

app.engine('handlebars', exphbars.engine({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');
var hbs = exphbars.create({});
var hbs1 = exphbars.create({});
var hbs2 = exphbars.create({});
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

// hbs2.handlebars.registerHelper('flightId', function(flightId,req,res) {
//   //  async (req, res) => {
//     return req.session.flightId = flightId;
  
//   //  return req.session.flightId;
// });


app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  })
);

// app.use("/", (req, res, next) => {
//   if (!req.session.user) {
//       res.render('forbiddenAccess', {title : 'Forbidden'});
//   }
//   else{
//     next();
//   }
// });

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});

app.use("/searchflights/flightdetails/:id/book", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect(`/login`);
  } else {
    next();
  }
});
app.use("/searchflights/flightdetails/:id/book/success", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect(`/login`);
  } else {
    next();
  }
});


configRoutes(app);

app.listen(3000, () => {
    console.log("Server ON!!");
    console.log("Your routes will be running on http://localhost:3000");
});