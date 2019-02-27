// rules for registrations

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
   let errors = {};

   // Terenary that test if it is an empty string or not.
   // If it !isEmpty (is not empty)use its value. If it is an empty string, it will follow the if statement below

   data.text  = !isEmpty(data.text) ? data.text : '';
   
   if(!Validator.isLength(data.text, {min:10, max:300})){
      errors.text = 'Post must be between 10 and 300 characters';
   }
     
   if(Validator.isEmpty(data.text)){
      errors.text = 'Text field is required';
   }

   return{
      errors, 
      isValid: isEmpty(errors)
   }
}