const { Code, User } = require("../Models/Model");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const { isAllUnder50Character, containSpeCaracters } = require('../Models/Utile')
const IP = require('ip');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&]{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'isidorquest@gmail.com',
    pass: 'qbimqevwqdqgviaz',
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendCodeForRetrivePass = async (req, res) => {
  try {
    const data = req.body
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const findUser = await User.findOne(
      { email: data.email }
    ).exec()

    if (containSpeCaracters([data.email])) {
      return res.status(408).send("forbiden carac")
    }

    if (!isAllUnder50Character([data.email])) {
      return res.status(406).send("input doivent etre <= 64")
    }
    if (!emailRegex.test(data.email)) {
      return res.status(405).send("email non conform !")
    }

    if (findUser == null) {
      return res.status(401).send("Ce mail n'a pas de compte Isidor associé !")
    }
    console.log(findUser.birthday)
    console.log(new Date(data.birthday))
    if (findUser.birthday.getFullYear() !== new Date(data.birthday).getFullYear() || findUser.birthday.getDate() !== new Date(data.birthday).getDate() || findUser.birthday.getMonth() !== new Date(data.birthday).getMonth()) {
      return res.status(409).send("Date anniversaire incorrect")
    }

    const CODE = Math.floor(100000 + Math.random() * 900000)
    let today = new Date()
    let expireDate = today.setMinutes(today.getMinutes() + 1)

    await transporter.sendMail({
      from: "no-reply <foo@example.com>",
      to: req.body.email,
      subject: "Code de verification",
      text: "Votre code pour l'initialisation du mot de passe: " + CODE,
    })

    const newCode = new Code({
      email: req.body.email,
      ExpirationDate: expireDate,
    })

    newCode.code = newCode.generateHashCode(CODE);
    await newCode.save();
    return res.status(200).send()

  } catch (error) {
    console.error("sendCodeForRetrivePass Error:", error)
  }
}

const SendCode = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const ipAddress = IP.address();
    const findUserByIpAdress = await User.find({ ExpirationDate: { $gt: new Date() } }).exec();
    const findUserMail = await User.findOne({ email: data.email }).exec();
    const findUserPseudo = await User.findOne({ pseudo: data.pseudo }).exec();
    if (!isAllUnder50Character(data)) {
      return res.status(406).send("input doivent etre <= 64")
    }

    if (containSpeCaracters(data)) {
      return res.status(408).send("forbiden carac")
    }
    if (findUserByIpAdress.length > 0) {
      for (const resultat of findUserByIpAdress) {
        if (resultat.validIpAdress(ipAddress)) {
          console.log(findUserByIpAdress);
          return res.status(410).send("Une création de compte par jour");
        }
      }
    }
    if (findUserMail !== null) {
      return res.status(401).send("Vous possèder déja un compte, si vous avez oublié le mot de passe, vous pouvez le reinitialisé");
    }
    if (findUserPseudo !== null) {
      return res.status(402).send("Ce nom d'utilisateur est déja pris");
    }

    if (data.password !== data.confirmPass)
      return res.status(403).send("Les mot de passes ne correspondent pas")

    if (!passwordRegex.test(data.password)) {
      return res.status(405).send("le mot de passe doit respecter les exigence")
    }
    if (new Date(data.bhirthday) >= new Date()) {
      return res.status(412).send("Date anniversaire incorrect");
    }
    if (new Date().getFullYear() - new Date(data.bhirthday).getFullYear() < 18) {
      return res.status(413).send("Vous devez être majeur");
    }
    if (new Date().getFullYear() - new Date(data.bhirthday).getFullYear() >= 123) {
      return res.status(414).send("Votre vrai date de naissance");
    }
    let code = Math.floor(100000 + Math.random() * 900000);
    let today = new Date();
    let expireDate = today.setMinutes(today.getMinutes() + 1);

    console.log(code);
    await transporter.sendMail({
      from: '"no-reply" <foo@example.com>',
      to: data.email, // list of receivers
      subject: "Code de verification", // Subject line
      text: "Voici le code à entrer sur le site : " + code, // plain text body
    });
    const newCode = new Code({
      email: data.email,
      ExpirationDate: expireDate,
    })
    newCode.code = newCode.generateHashCode(code);
    await newCode.save();
    return res.status(200).send("Mail bien envoyé")
  }
  catch (error) {
    console.error('erreur durant l envoie du code', error);
    res.status(500).send("erreur au niveau du backend");
  }
}

const VerifyCode = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const findCodeEmail = await Code.findOne({ email: data.email }).sort({ ExpirationDate: -1 }).limit(1).exec();
    const date = new Date()
    // console.log("is expired: ")
    // console.log(date)
    // console.log(findCodeEmail.ExpirationDate)
    // console.log(date > findCodeEmail.ExpirationDate)
    if (date > findCodeEmail.ExpirationDate && findCodeEmail.validCode(data.code)) {
      console.log("in")
      await Code.deleteOne({ email: data.email, code: findCodeEmail.code })
      return res.status(401).send("Votre code est expiré");
    }

    if (!isAllUnder50Character(data)) {
      return res.status(406).send("input doivent etre <= 64")
    }

    if (containSpeCaracters(data)) {
      return res.status(408).send("forbiden carac")
    }

    if (req.session.expirationDate && new Date() < req.session.expirationDate) {
      return res.status(409).send("bloqué, revenez plus tard");
    }

    if (!findCodeEmail.validCode(data.code)) {
      if (!req.session.error || req.session.error == null) {
        req.session.error = 1;
      }
      else {
        req.session.error = req.session.error + 1;
      }
      if (req.session.error && req.session.error == 5) {
        let dateExpiration = new Date();
        dateExpiration = dateExpiration.setMinutes(dateExpiration.getMinutes() + 10);
        req.session.error = null;
        req.session.expirationDate = dateExpiration;
      }
      return res.status(402).send("Code incorrect");
    }
    await Code.deleteOne({ email: data.email, code: findCodeEmail.code })
    return res.status(200).send("Code correct");
  }
  catch (error) {
    console.error('erreur durant la verification du code', error);
    res.status(500).send("erreur au niveau du backend");
  }
}

module.exports = {
  SendCode,
  VerifyCode,
  sendCodeForRetrivePass
};