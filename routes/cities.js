// Dedicated file for handling routes
var express = require('express');
// Returns router instance that can be mounted as middleware
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

// Blocks as objects with descriptions
var cities = {
    'Providence': 'Rhode Island',
    'Boston': 'Massachusetts',
    'Bristol': 'Rhode Island, East Bay'
};

// The root path relative to the path where its mounted
// app.use('/blocks') in middleware.js
router.route('/')
    .get(function(request, response) { // lines with a dot indicate function calls
        var cities = ['Providence', 'Boston', 'Bristol'];
        // query string param to limit number of blocks returned
        if (request.query.limit >= 0) {
            response.json(cities.slice(0, request.query.limit));
        } else {
            response.json(cities);
        }
    })
    .post(parseUrlencoded, function(request, response) {
        var newCity = request.body;
        cities[newCity.name] = newCity.location;
        console.log(cities);
        // Sets 201 created status, repsonse with new block name
        response.status(201).json(newCity.name);
    });
    // .route, .get, and .post are chained together now
    // Chaining means calling functions on the return of previous functions

// Dynamic route
router.route('/:name')
// .all operates the same as app.param
    .all(function(request, response, next) {
        var name = request.params.name;
        
        request.cityName = name;
        next();
    })
    .get(function(request, response) {
        var location = cities[request.cityName];
        // Returns error 404 if 'name' not found
        if (!location) {
            response.status(404).json('No location found for ' + request.params.name);   
        } else {
            response.json(location);    
        }
    })
    .delete(function(request, response) {
        delete cities[request.cityName];
        response.sendStatus(200);    
    });

module.exports = router;