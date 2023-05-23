//create an object for the express library
const express = require('express');
//importing axios
const axios = require('axios');
//initialize appr
const router = express.Router();

// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = `Low of ${low_temp}, high of ${high_temp} with ${description}`;

    }
};

//configure routes to retrive weather data -- Define a route that responds with a JSON object when a GET request is made to the root path

router.get('/weather', (req, res) => {
    let { lat, lon } = req.query;
    const weatherBit = 'f1c2483a7c184b72884c4bebe83d585e';

    axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherBit}`)

        .then((response) => {

            console.log(response)
            const forecastData = response.data.data.slice(0,3).map(obj => {
                return new Forecast(obj.datetime, obj.weather.description, obj.high_temp, obj.low_temp,)
            });
      
            cache.set(cacheKey, forecastData, 86400)
            res.send(forecastData);
        })

        .catch(error => {
            res.status(500).json({ error: 'an error occured while fetching forecast data' });
        });
});

module.exports = router;