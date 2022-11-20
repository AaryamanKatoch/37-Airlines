const express = require('express');
const app = express();

const configRoutes = require('./routes');
const exphbars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("Server ON!!");
    console.log("Your routes will be running on http://localhost:3000");
});