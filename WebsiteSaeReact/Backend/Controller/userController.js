const mongoose = require('mongoose');
const { User } = require("../Models/Model")


const Inscription = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const newUser = new User({
      prenom: data.prenom,
      nomFamille: data.nomFamille,
      email: data.email,
      pseudo: data.pseudo,
      isPay: false
    });
    newUser.password = newUser.generateHash(data.password);
    req.session.pseudo = data.pseudo;
    await newUser.save();
    return res.status(200).send('Données enregistrées avec succès');
  } catch (error) {
    console.error('erreur durant l inscription', error);
    res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
  }
}

const Connexion = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const findUserPseudo = await User.findOne({ pseudo: data.pseudo }).exec();
    if (findUserPseudo === null) {
      return res.status(401).send("Nom d'utilisateur/Mot de passe incorrect");
    }
    if (!findUserPseudo.validPassword(data.password)) {
      return res.status(402).send("Nom d'utilisateur/Mot de passe incorrect");
    }
    req.session.pseudo = data.pseudo;
    return res.status(200).send("connexion reussie");
  } catch (error) {
    console.error('erreur durant la connexion', error);
    res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
  }
}

const getUserData = async (req, res) => {
    try{
      await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
      const pseudo = req.session.pseudo
      const currentUser = await User.findOne(
        { pseudo: pseudo }
      ).exec();
    // console.log(req.session)
  
      if (currentUser == null)
        return res.status(502).send('Utilisateur non trouvé');
      return res.status(200).json(currentUser)
    }catch (error) {
      console.error('erreur durant getUserData', error);
      res.status(500).send("erreur lors de la récupération des données au niveau du backend");
    }
};

const changeUserData = async (req, res) => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    // const pseudo = req.session.pseudo
    const datas = req.body

    const currentUser = await User.findOne(
      { email: datas.email }
    ).exec();
    if (currentUser == null){
      return res.status(502).send('Utilisateur non trouvé');
    }

    // console.log(datas)
    // const existUserMail = await User.findOne({ email: datas.email }).exec();
    const existUserPseudo = await User.findOne({ pseudo: datas.pseudo }).exec();
    if (existUserPseudo !== null) {
      return res.status(402).send("Ce pseudo est déja pris");
    }

    const result = await User.updateOne(
      { email: datas.email },
      { $set: { 
        prenom: datas.prenom ,
        nomFamille: datas.nomFamille ,
        pseudo: datas.pseudo 
      }}
    ).exec()
    // console.log(datas.prenom)
    // console.log(datas.email)
    // console.log(result)

    if (result.acknowledged)
      req.session.pseudo=datas.pseudo 
      return res.status(200).send('UserData change avec succes')
  }catch (error) {
    console.error('erreur durant changeUserData', error);
    res.status(500).send("erreur lors de la modification data des données au niveau du backend");
  }

};

const changePwd = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const datas = req.body

    if (datas.pass !== datas.confirmPass)
      return res.status(401).send('Les deux mots de pass ne correspondent pas')

    const currentUser = await User.findOne(
      { email: datas.email }
    ).exec()

    if (currentUser == null)
      return res.status(402).send()

    const result = await User.updateOne(
      { email: datas.email },
      { $set: { password: currentUser.generateHash(datas.pass) } }
    ).exec()

    if (result)
      return res.status(200).send('Mot de passe modifier avec succes')

  } catch (error) {
    console.error('error when updating the pass word', error)
  }
}

const isConnect = async (req, res) => {
  if (req.session.pseudo == null) {
    return res.status(200).send(false);
  }
  else {
    return res.status(200).send(true);
  }
}

const disconnection = async (req, res) => {
  req.session.pseudo = null;
  return res.status(200).send(false);
}

const VerifySuccessPayment = async (req, res) => {
  if (req.session.succesPayment == true) {
    req.session.succesPayment = false;
    return res.status(200).send(true);
  }
  else {
    return res.status(200).send(false);
  }
}
module.exports = {
  Inscription,
  Connexion,
  changePwd,
  isConnect,
  disconnection,
  VerifySuccessPayment,
  getUserData,
  changeUserData
};