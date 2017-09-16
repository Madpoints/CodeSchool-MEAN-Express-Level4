var express = require('express');
var app = express();

// .use will serve files from folder without using dirname etc.
// defaults to serve index.html
app.use(express.static('public'));

// Extracting routes to modules
var cities = require('./routes/cities');
app.use('/cities', cities);

app.listen(process.env.PORT, function() {
    console.log(process.env.PORT);
});