"use strict"
//initializes enviornment variables
require('dotenv').config(); 
//create an object for the express library
const express = require('express'); 
//create an object for the cors (cross-origin resource sharing) library
const cors = require('cors');
//const { response } = require('express');
const data = require('../src/weather.json')
//initialize app
const app = express();
const serverless = require("serverless-http");
// Create a router to handle routes
const router = express.Router();
//allows cross-origin resource sharing
app.use(cors());
// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
    res.json({
      hello: "hi!"
    });
  });


//configure routes to retrive weather data 
router.get('/weather', (request, response) => {
    //query parameters
    let {lat, lon, searchQuery} = request.query; 

    //.find method searches json file for location data
    let locationData = data.find(location => {
        //checks if locationData matches data from JSON file
        if (searchQuery === location.city_name || lat === location.lat || lon === location.lon) {
            return true;
        } else { // returns error code if no match found
            return false; 
        }
    })

    if (locationData === undefined) { //sends error response code
        response.status(404).send({message: 'city not found'});
        return;
    };

    // creates an array of forecast objects by mapping over the data of the locationsData object
    let forecastFinder = locationData.data.map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, locationData.lat, locationData.lon, locationData.city_name)
    });

    // sends full array back to client
    response.send(forecastFinder)

});

app.use ((error, request, response, next) => {
    console.log(error);
    response.status(500).send(error.message);
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/server`, router);

//start app 
app.listen(3001);

// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, lon, lat, city_name) {
        this.date = date;
        this.description = description;
        this.lon = lon;
        this.lat = lat;
        this.city_name = city_name
    }
};

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);