"use strict"
//initializes enviornment variables
require('dotenv').config(); 
//create an object for the express library
const express = require('express'); 
//create an object for the cors (cross-origin resource sharing) library
const cors = require('cors');
//const { response } = require('express');
const data = require('./data/weather.json')
//initialize app
const app = express();
//allows cross-origin resource sharing
app.use(cors());
// Define a route that responds with a JSON object when a GET request is made to the root path


//configure routes to retrive weather data 
app.get('/weather', (request, response) => {
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
        response.status(500).send({message: 'city not found'});
        return;
    };

    // creates an array of forecast objects by mapping over the data of the locationsData object
    let forecastFinder = locationData.data.map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, locationData.lat, locationData.lon, locationData.city_name)
    });

    // sends full array back to client
    response.send(forecastFinder)

});

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
