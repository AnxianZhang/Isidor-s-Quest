const mongoose = require('mongoose');
const { User, UserGame, Game } = require("../Models/Model")
const { isAllUnder50Character, containSpeCaracters } = require('../Models/Utile')
var localStorage = require('localStorage')
const IP = require('ip');

const Inscription = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    localStorage.setItem('isConnect', JSON.stringify({ pseudo: data.pseudo }));
    const ipAddress = IP.address();
    const date  = new Date();
    const birthdayDate = new Date(data.bhirthday);
    date.setDate(date.getDate() + 1);
    const newUser = new User({
      prenom: data.prenom,
      nomFamille: data.nomFamille,
      email: data.email,
      pseudo: data.pseudo,
      isPay: false,
      birthday : birthdayDate,
      ExpirationDate : date
    });
    const newUserGame = new UserGame({
      pseudo: data.pseudo,
      coins: 0,
      Archer: { levelStrength: 1, levelDefence: 1, levelSpeed: 1, levelLife: 1 },
      Warrior: { levelStrength: 1, levelDefence: 1, levelSpeed: 1, levelLife: 1 },
      inventory: { item1: null, item2: null, item3: null, item4: null },
      ActualLevel: 3
    })
    newUser.password = newUser.generateHash(data.password);
    newUser.userIpAdress = newUser.generateHashIpAdress(ipAddress);
    req.session.pseudo = data.pseudo;
    await newUser.save();
    await newUserGame.save();
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
    if (!isAllUnder50Character(data))
      return res.status(406).send("input doivent etre <= 64")

    if (containSpeCaracters(data)) {
      return res.status(408).send("forbiden carac")
    }

    // localStorage.setItem('isConnect', JSON.stringify({ pseudo: data.pseudo }));
    const findUserPseudo = await User.findOne({ pseudo: data.pseudo }).exec();
    if (findUserPseudo === null || !findUserPseudo.validPassword(data.password)) {
      return res.status(401).send("Nom d'utilisateur/Mot de passe incorrect");
    }
    //req.session.pseudo = data.pseudo;
    req.session.canGoTo2FA = true
    return res.status(200).send("connexion reussie");
  } catch (error) {
    console.error('erreur durant la connexion', error);
    res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
  }
}

const getUserData = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const pseudo = req.session.pseudo
    const currentUser = await User.findOne(
      { pseudo: pseudo }
    ).exec();
    // console.log(req.session)

    if (currentUser == null)
      return res.status(502).send('Utilisateur non trouvé');
    return res.status(200).json(currentUser)
  } catch (error) {
    console.error('erreur durant getUserData', error);
    res.status(500).send("erreur lors de la récupération des données au niveau du backend");
  }
};

const getUserDataPayAndConnect = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const pseudo = req.session.pseudo
    const currentUser = await User.findOne(
      { pseudo: pseudo }
    ).exec();

    if (currentUser == null) {
      return res.status(502).send('Utilisateur non trouvé');
    }
    if (currentUser.isPay === true) {
      return res.status(200).json(currentUser);
    }
    else {
      return res.status(501).send("Compte non payé");
    }
  } catch (error) {
    console.error('erreur durant getUserData', error);
    res.status(500).send("erreur lors de la récupération des données au niveau du backend");
  }
};

const changeUserData = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    // const pseudo = req.session.pseudo
    const datas = req.body

    const currentUser = await User.findOne(
      { email: datas.email }
    ).exec();
    if (currentUser == null) {
      return res.status(502).send('Utilisateur non trouvé');
    }

    if (containSpeCaracters(datas)) {
      return res.status(408).send("forbiden carac")
    }

    if (!isAllUnder50Character(datas))
      return res.status(406).send("input doivent etre <= 64")

    // console.log(datas)
    // const existUserMail = await User.findOne({ email: datas.email }).exec();
    const existUserPseudo = await User.findOne({ pseudo: datas.pseudo }).exec();
    if (existUserPseudo != null && existUserPseudo.email != datas.email) {
      return res.status(402).send("Ce pseudo est déja pris");
    }
    if (currentUser.email == datas.email &&
      currentUser.prenom == datas.prenom &&
      currentUser.nomFamille == datas.nomFamille &&
      currentUser.pseudo == datas.pseudo) {
      return res.status(403).send("Pas de modification");
    }

    const result = await User.updateOne(
      { email: datas.email },
      {
        $set: {
          prenom: datas.prenom,
          nomFamille: datas.nomFamille,
          pseudo: datas.pseudo
        }
      }
    ).exec()

    await UserGame.updateOne(
      { pseudo: currentUser.pseudo },
      {
        $set: {
          pseudo: datas.pseudo
        }
      }
    ).exec()

    await Game.updateMany(
      { pseudo: currentUser.pseudo },
      {
        $set: {
          pseudo: datas.pseudo
        }
      }
    ).exec()
    // console.log(datas.prenom)
    // console.log(datas.email)
    // console.log(result)

    if (result.acknowledged)
      req.session.pseudo = datas.pseudo
    localStorage.setItem('isConnect', JSON.stringify({ pseudo: datas.pseudo }));
    return res.status(200).send('UserData change avec succes')
  } catch (error) {
    console.error('erreur durant changeUserData', error);
    res.status(500).send("erreur lors de la modification data des données au niveau du backend");
  }

};

const changePwd = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const datas = req.body

    if (containSpeCaracters(datas)) {
      return res.status(408).send("forbiden carac")
    }

    if (!isAllUnder50Character(datas))
      return res.status(406).send("input doivent etre <= 64")

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
    localStorage.removeItem("isConnect");
    return res.status(200).send(false);
  }
  else {
    return res.status(200).send(true);
  }
}

const disconnection = async (req, res) => {
  localStorage.removeItem("isConnect")
  req.session.destroy()
  return res.status(200).send(false)
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
  changeUserData,
  getUserDataPayAndConnect
};