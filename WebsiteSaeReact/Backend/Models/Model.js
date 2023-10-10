const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   prenom : String,
   nomFamille : String,
   email : String,
   pseudo : String,
   password : String
});
  
const User = mongoose.model('User', userSchema, "User");

module.exports =  {
    User
}