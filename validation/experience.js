// rules for registrations

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
   let errors = {};

   // Terenary that test if it is an empty string or not.
   // If it !isEmpty (is not empty)use its value. If it is an empty string, it will follow the if statement below

   data.title  = !isEmpty(data.title) ? data.title : '';
   data.company = !isEmpty(data.company) ? data.company : '';
   data.from = !isEmpty(data.from) ? data.from : '';



   if(!Validator.isEmpty(data.title)){
      errors.title = 'Job title field is required.';
   }

   if(!Validator.isEmpty(data.company)){
      errors.company = 'Company field is required.';
   }

   if(!Validator.isEmpty(data.from)){
      errors.from = 'from field is required.';
   }

   
   return{
      errors, 
      isValid: isEmpty(errors)
   }
}