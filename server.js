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

// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = `Low of ${low_temp}, high of ${high_temp} with ${description}`;

    }
};

// Define a Moive class to represent movie data
class Movie {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.average_votes = vote_average;
        this.total_votes = vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${poster_path}`;
        this.popularity = popularity;
        this.released_on = release_date;

    }
};


app.get('/', (req, res) => {
    res.send('hello city explorer!');
    console.log ('hello city explorer!')
});

//configure routes to retrive weather data -- Define a route that responds with a JSON object when a GET request is made to the root path

app.get('/weather', (req, res) => {
    let { lat, lon } = req.query;
    const weatherBit = 'f1c2483a7c184b72884c4bebe83d585e';

    axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherBit}`)

        .then((response) => {

            console.log(response)
            const forecastData = response.data.data.slice(0,3).map(obj => {
                return new Forecast(obj.datetime, obj.weather.description, obj.high_temp, obj.low_temp,)
            });


            res.send(forecastData);
        })

        .catch(error => {
            res.status(500).json({ error: 'an error occured while fetching forecast data' });
        });
});

app.get('/movies', (req, res) => {
    let { searchQuery } = req.query;
    const movieDB = '5e216003b3fed6a5e05e2a6023f8a49f'

    axios.get(`https://api.themoviedb.org/3/search/multi?&query=${searchQuery}&api_key=${movieDB}`)

        .then((response) => {
            console.log("response: ", response.data)
            let movieFinder = response.data.results.map(obj => {
                return new Movie(obj.original_title || obj.original_name, obj.overview, obj.vote_average, obj.vote_count, obj.poster_path, obj.popularity, obj.release_date)
            })
            res.send(movieFinder);
        })

        .catch(error => {
            res.status(500).send({ error: 'The ID is invalid.' })
        })

});


//start app
app.listen(3001);
console.log ('hello city explorer!')
