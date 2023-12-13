const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
   prenom : String,
   nomFamille : String,
   email : String,
   pseudo : String,
   password : String,
   isPay : Boolean
});

const codeSchema = new mongoose.Schema({
    email : String,
    code : Number,
    ExpirationDate : Date,
 });

 const gameSchema = new mongoose.Schema({
    //pseudo : String,
    levelName : String,
    chooseCharacter : String,
    coins : Number,
    health : Number,
    reussie : Boolean,
    successPercentLevel : Number
 });
 
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema, "User");
const Code = mongoose.model('Code', codeSchema, "Code");
const Game = mongoose.model('Game', gameSchema, "Game");

module.exports =  {
    User,
    Code,
    Game
}