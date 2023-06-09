"use strict"
//initializes movie module
const movies = require('./movies');
//initializes weather module
const weather = require('./weather');
//initializes enviornment variables
require('dotenv').config();
//create an object for the express library
const express = require('express');
//create an object for the cors (cross-origin resource sharing) library
const cors = require('cors');
//importing axios
const axios = require('axios');
//initialize app
const app = express();
//allows cross-origin resource sharing
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello city explorer!');
    console.log ('hello city explorer!')
});

// Use movies.js as middleware
app.use(movies);

// Use weather.js as middleware
app.use(weather);

//start app
app.listen(3001);
console.log ('hello city explorer!')
