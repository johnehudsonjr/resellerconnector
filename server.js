const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

//  Mongoose is the library that supports the data modeling for MongoDB. I imported Mongoose at the top of the application and use the below script to connect to the db
mongoose
   .connect(db, { useNewUrlParser: true })
   .then(() => console.log("MongoDB is connected"))
   .catch(err => console.log(err));


// app.get('/', (req, res)=> res.send('Hello John, this is  from your server!'));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// use routes EX. When a user types in this url (___/api/users) it will go to to the users page in api folder and run what is called in that folder.

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Create a Port to run it on heroku or local host 5000
const port = process.env.PORT || 5000;

app.listen(port,  () => console.log(`Server running on port ${port}`))