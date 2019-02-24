const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// This is used to encrypt the password
const bcrypt = require('bcryptjs')


// Load User Model
const User = require('../../models/User')

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get('/test', (req, res) => res.json({msg: "Users Works"})
);

// @route   GET api/users/register
// @desc    Register a user
// @access  Public

router.post('/register', (req,res) =>{
   // This allows us to look for a record for one usere a user is trying to register with
   User.findOne({email: req.body.email})
      .then(user => {
         if(user){
            return res.status(400).json({email: 'This email already exists'})
         } else{
            const avatar = gravatar.url(req.body.email, {
               s:'200', // size
               r:'pg', // rating
               d: 'mm' // default
            });

            const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               avatar,
               password: req.body.password
            });
            
            // This is used to encrypt the password. We pass in the newUser object from above with the password and set the newUser.password to hash which is ecryption standards to make it difficult to be hacked.
            bcrypt.genSalt(10, (err, salt) =>{
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                     .then(user => res.json(user))
                     .catch(err => console.log(err));
               })
            })
         }
      })
});
module.exports = router;