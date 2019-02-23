const express = require('express');
const mongoose = require('mongoose');


const app = express();

const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

mongoose
   .connect(db, { useNewUrlParser: true })
   .then(() => console.log("MongoDB is connected"))
   .catch(err => console.log(err));


app.get('/', (req, res)=> res.send('Hello John, this is  from your server!'));


// Create a Port to run it on heroku or local host 5000
const port = process.env.PORT || 5000;

app.listen(port,  () => console.log(`Server running on port ${port}`))