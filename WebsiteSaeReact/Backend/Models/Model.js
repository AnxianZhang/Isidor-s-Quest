const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  prenom: String,
  nomFamille: String,
  email: String,
  pseudo: String,
  password: String,
  isPay: Boolean,
  userIpAdress: String,
  ExpirationDate: Date
});

const codeSchema = new mongoose.Schema({
  email: String,
  code: String,
  ExpirationDate: Date,
});

const expirationMinutes = 1

const FA2SSchema = new mongoose.Schema({
  pseudo: String,
  ascii: String,
  expirationDate: { type: Date, expires: expirationMinutes + 'm' } // L'option 'expires' gère la création de l'index TTL
})

const gameSchema = new mongoose.Schema({
  pseudo: String,
  levelName: String,
  chooseCharacter: String,
  coins: Number,
  health: Number,
  reussie: Boolean,
  successPercentLevel: Number
});

const userGameSchema = new mongoose.Schema({
  pseudo: String,
  coins: Number,
  ActualLevel: Number,
  Archer: { levelStrength: Number, levelDefence: Number, levelSpeed: Number, levelLife: Number },
  Warrior: { levelStrength: Number, levelDefence: Number, levelSpeed: Number, levelLife: Number },
  inventory: { item1: Number, item2: Number, item3: Number, item4: Number }
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

codeSchema.methods.generateHashCode = function (code) {
  var hashCode = code.toString();
  return bcrypt.hashSync(hashCode, bcrypt.genSaltSync(8), null);
};

codeSchema.methods.validCode = function (code) {
  return bcrypt.compareSync(code, this.code);
};

userSchema.methods.generateHashIpAdress = function(ipAdress) {
  var hashIpAdress = ipAdress.toString();
  return bcrypt.hashSync(hashIpAdress, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validIpAdress = function(ipAdress) {
  return bcrypt.compareSync(ipAdress, this.userIpAdress);
};

const User = mongoose.model('User', userSchema, "User");
const Code = mongoose.model('Code', codeSchema, "Code");
const Game = mongoose.model('Game', gameSchema, "Game");
const UserGame = mongoose.model('UserGame', userGameSchema, "UserGame");
const FA2 = mongoose.model('2FA', FA2SSchema, '2FA')
module.exports = {
  User,
  Code,
  Game,
  UserGame,
  FA2,
  expirationMinutes : expirationMinutes
}