// rules for registrations

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
   let errors = {};

   // Terenary that test if it is an empty string or not.
   // If it !isEmpty (is not empty)use its value. If it is an empty string, it will follow the if statement below

   data.school = !isEmpty(data.school) ? data.school : '';
   data.degree = !isEmpty(data.degree) ? data.degree : '';
   data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
   data.from = !isEmpty(data.from) ? data.from : '';

   if(Validator.isEmpty(data.school)){
      errors.school = 'School field is required.';
   }

   if(Validator.isEmpty(data.degree)){
      errors.degree = 'Degree field is required.';
   }

   if(Validator.isEmpty(data.fieldofstudy)){
      errors.fieldofstudy = 'Field of study is required.';
   }

   if(Validator.isEmpty(data.from)){
      errors.from = 'From date field is required.';
   }

   
   return{
      errors, 
      isValid: isEmpty(errors)
   }
}