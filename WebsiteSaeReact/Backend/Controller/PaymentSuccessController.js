const {RetrieveInvoiceURL} = require("./PaymentCardController");
const mongoose = require('mongoose');
const { User } = require("../Models/Model")
const userPay = async(req, res) =>{
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
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
      await User.updateOne({ pseudo: req.session.pseudo }, { isPay: true }).exec();

      if(req.session.checkoutid){
        const invoiceURL = RetrieveInvoiceURL(req.session.checkoutid).then(token => { return token } );
        invoiceURL.then(function(result) {
          res.status(200).send(result);
        });
        req.session.checkoutid = null;
      }
      

    } catch (error) {
      console.error('erreur durant l inscription', error);
    }
  }
module.exports = {
    userPay,
    successPayment
}