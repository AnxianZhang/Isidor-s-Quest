const mongoose = require('mongoose');
const { User } = require("../Models/Model")
const userPay = async(req, res) =>{
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
      console.log(req.session);
      const findUserPseudo = await User.findOne({pseudo : req.session.pseudo}).exec();
      return res.status(200).send(findUserPseudo.isPay);
    } catch (error) {
      console.error('erreur durant la connexion', error);
      res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
    }
  }
  const successPayment = async (req, res) =>{
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
      console.log(req.session);
      await User.updateOne({ pseudo: req.session.pseudo }, { isPay: true }).exec();
      res.redirect("http://localhost:19006/Success");
    } catch (error) {
      console.error('erreur durant l inscription', error);
    }
  }
module.exports = {
    userPay,
    successPayment
}