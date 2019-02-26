// rules for registrations

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
   let errors = {};

   // Terenary that test if it is an empty string or not.
   // If it !isEmpty (is not empty)use its value. If it is an empty string, it will follow the if statement below

   data.email  = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';


  
   if(Validator.isEmpty(data.email)){
      errors.email = 'Email field is required';
   }

   if(!Validator.isEmail(data.email)){
      errors.email = 'Email is invalid.';
   }

   if(Validator.isEmpty(data.password)){
      errors.password = 'Password field is required';
   }

   return{
      errors, 
      isValid: isEmpty(errors)
   }
}