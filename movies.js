//create an object for the express library
const express = require('express');
//importing axios
const axios = require('axios');
//initialize app
const router = express.Router();

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


router.get('/movies', (req, res) => {
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

module.exports = router;