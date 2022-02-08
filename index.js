import 'dotenv/config';

const express = require('express');
const app = express();
const appPort = process.env.PORT;

// setting up template engine
app.set('view engine', 'ejs');

// pointing to static files
app.use(express.static(__dirname + '/public'));

// get app routes
app.get('/', (req, res) => {
    res.render('pad');
});

app.get('/:id', (req, res) => {
    res.render('pad');
})

// add shareJS for realtime saving and updates. depends on redis
var sharejs = require('share');
require('redis');

// setting share options
var options = {
    db: {type: 'redis'},
}

// attaching our express server to sharejs
sharejs.server.attach(app, options);


console.log('');
app.listen(appPort, () => {
    console.log(`App Listening on Port ${appPort}!`);
});