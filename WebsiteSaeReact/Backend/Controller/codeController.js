const { Code, User } = require("../Models/Model");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');


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

const SendCode = async(req, res)=>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data  = req.body;
    const findUserMail = await User.findOne({email : data.email}).exec();
    const findUserPseudo = await User.findOne({pseudo : data.pseudo}).exec();
    if(findUserMail !== null){
        return res.status(401).send("Vous possèder déja un compte, si vous avez oublié le mot de passe, vous pouvez le reinitialisé");
    }
    if(findUserPseudo !== null){
       return res.status(402).send("Ce nom d'utilisateur est déja pris");
    }
    let code =  Math.floor(100000 + Math.random() * 900000);
    let today = new Date();
    let expireDate = today.setHours(today.getHours() + 1);
    console.log(code);
    await transporter.sendMail({
      from: '"no-reply" <foo@example.com>', 
      to: data.email, // list of receivers
      subject: "Code de verification", // Subject line
      text: "Voici le code à entrer sur le site : " + code, // plain text body
    });
    const newCode  = new Code({
        email : data.email,
        code : code,
        ExpirationDate : expireDate, 
    })
    await newCode.save();
    return res.status(200).send("Mail bien envoyé")
  }
  catch(error){
    console.error('erreur durant l envoie du code', error);
    res.status(500).send("erreur au niveau du backend");
  }
}

const VerifyCode = async(req, res) =>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data  = req.body;
    const findCodeEmail = await Code.findOne({email : data.email}).sort({ExpirationDate : -1}).limit(1).exec();
    const date = new Date();
    if(date > findCodeEmail.ExpirationDate && findCodeEmail.code === data.code){
      return res.status(401).send("Votre code est expiré");
    }
    if(findCodeEmail.code !== data.code){
      return res.status(402).send("Code incorrect");
    } 
    return res.status(200).send("Code correct");
  }
  catch(error){
    console.error('erreur durant la verification du code', error);
    res.status(500).send("erreur au niveau du backend");
  }
}

module.exports = {
  SendCode,
  VerifyCode
};