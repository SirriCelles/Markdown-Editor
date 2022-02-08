import 'dotenv/config';

const express = require('express');
const app = express();
const appPort = process.env.PORT;

// setting up template engine
app.set('view engine', 'ejs');

// pointing to static files
app.use(express.static(__dirname + '/public'));

// get app routes
app.get('/', function(req, res) {
    res.render('pad');
});


console.log('');
app.listen(appPort, () => {
    console.log(`App Listening on Port ${appPort}!`);
});