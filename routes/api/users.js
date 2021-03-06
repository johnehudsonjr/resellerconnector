const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport')

// This is used to encrypt the password
const bcrypt = require('bcryptjs')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

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
   // This checks the rules against what was created
   const{errors, isValid} = validateRegisterInput(req.body);

   // Check Validation
   if(!isValid){
      return res.status(400).json(errors)
   }

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

// @route   GET api/users/login
// @desc    Login user
// @access  Public

router.post('/login', (req,res) => {

   const{errors, isValid} = validateLoginInput(req.body);

   // Check Validation
   if(!isValid){
      return res.status(400).json(errors)
   }
   const email = req.body.email;
   const password = req.body.password;

    // find user by email
    User.findOne({email})
      .then(user =>{

      // check for user
      if(!user){
         errors.email = 'User not found'
         return res.status(404).json(errors);
      }
      // check Password
      bcrypt.compare(password, user.password)
      .then(isMatch =>{
         if(isMatch){
         //   User matched

         // createPayload
         const payload = {  id: user.id, name: user.name, avatar:user.avatar} 
         
         // Sign Token
         jwt.sign(payload,
            keys.secretOrKey, 
            {expiresIn: 3600},
            (err, token) =>{
               res.json({
                  success: true,
                  token: 'Bearer ' + token
               })
            }
            
            );

         }

         else{
            errors.password = 'Password incorrect'
            return res.status(400).json(errors);
         }
      
      });
   
   });
});
 
// @route   GET api/users/current
// @desc    Return current users
// @access  Private
router.get('/current', passport.authenticate('jwt', {session:false}), (req,res) =>{
   res.json(req.user)
});
 
module.exports = router;