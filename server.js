"use strict"
//initializes enviornment variables
require('dotenv').config(); 
//create an object for the express library
const express = require('express'); 
//create an object for the cors (cross-origin resource sharing) library
const cors = require('cors');
//const { response } = require('express');
const axios = require('axios');
//initialize app
const app = express();
//allows cross-origin resource sharing
app.use(cors());
// Define a route that responds with a JSON object when a GET request is made to the root path

const weatherBit = 'f1c2483a7c184b72884c4bebe83d585e'


//configure routes to retrive weather data 
app.get('/weather', (req, res) => {
    let {lat, lon} = req.query;

    let forecastData = axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${lat}&lon=${lon}&key=${weatherBit}`)
    
    .then((response) => {
        console.log(response)
        let forecastFinder = response.data.data.map(obj => {
        return new Forecast(obj.datetime, obj.weather.description, obj.high_temp, obj.low_temp,)})
        res.send(forecastFinder)

    })

    //query parameters
    // let {lat, lon, searchQuery} = request.query; 

    // //.find method searches json file for location data
    // let locationData = data.find(location => {
    //     //checks if locationData matches data from JSON file
    //     if (searchQuery === location.city_name || lat === location.lat || lon === location.lon) {
    //         return true;
    //     } else { // returns error code if no match found
    //         return false; 
    //     }
    // })

    // if (locationData === undefined) { //sends error response code
    //     response.status(500).send({message: 'city not found'});
    //     return;
    // };

    // creates an array of forecast objects by mapping over the data of the locationsData object
    // let forecastFinder = locationData.data.map(obj => {
    //     return new Forecast(obj.valid_date, obj.weather.description, obj.high_temp, obj.low_temp, locationData.lat, locationData.lon, locationData.city_name)
    // });

    // // sends full array back to client
    // response.send(forecastFinder)

});

//start app
app.listen(3001);
console.log("hello"); 

// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high = high_temp;
        this.low = low_temp;
    }
};
