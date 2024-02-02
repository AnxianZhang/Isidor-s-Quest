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
    pseudo : String,
    levelName : String,
    chooseCharacter : String,
    coins : Number,
    health : Number,
    reussie : Boolean,
    successPercentLevel : Number
 });
 
 const userGameSchema = new mongoose.Schema({
    pseudo : String,
    coins : Number,
    ActualLevel : Number,
    Archer : {levelStrength : Number, levelDefence : Number,  levelSpeed : Number,levelLife : Number},
    Warrior : {levelStrength : Number, levelDefence : Number,  levelSpeed : Number,levelLife : Number},
   inventory : {item1 : Number, item2 : Number, item3 : Number, item4 : Number}
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
const UserGame = mongoose.model('UserGame', userGameSchema, "UserGame");
module.exports =  {
    User,
    Code,
    Game,
    UserGame
}