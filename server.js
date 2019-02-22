const express = require('express');
const mongoose = require('mongoose');
const app = express();

// DB Config
const db = require('./config/keys').mongoURI

app.get('/', (req, res)=> res.send('Hello John, this is  from your server!'));


// Create a Port to run it on heroku or local host 5000
const port = process.env.PORT || 5000;

app.listen(port,  () => console.log(`Server running on port ${port}`))