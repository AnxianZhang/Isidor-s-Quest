const mongoose = require('mongoose');
const { User } = require("../Models/Model")

const Inscription  = async(req, res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        console.log("ok");
        const data  = req.body;
        const findUserMail = await User.findOne({email : data.email}).exec();
        const findUserPseudo = await User.findOne({pseudo : data.pseudo}).exec();
        if(findUserMail !== null){
            return res.status(401).send("Vous possèder déja un compte, si vous avez oublié le mot de passe, vous pouvez e reinitialisé");
        }
        if(findUserPseudo !== null){
           return res.status(402).send("Ce nom d'utilisateur est déja pris");
        }
        const newUser = new User(data);
        await newUser.save();
        return res.status(200).send('Données enregistrées avec succès');
      } catch (error) {
        console.error('erreur durant l inscription', error);
        res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
      }
}

const Connexion  = async(req, res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        const data  = req.body;
        const findUserPseudo = await User.findOne({pseudo : data.pseudo}).exec();
        if(findUserPseudo === null){
            return res.status(401).send("Nom d'utilisateur/Mot de passe incorrect");
        }
        if(findUserPseudo.password !== data.password){
            return res.status(402).send("Nom d'utilisateur/Mot de passe incorrect");
        }
        return res.status(200).send("connexion reussie");
      } catch (error) {
        console.error('erreur durant la connexion', error);
        res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
      }
}
module.exports = {
    Inscription,
    Connexion
};