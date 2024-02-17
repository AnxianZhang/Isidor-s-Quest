const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const cors = require('cors');
const {Inscription, Connexion, changePwd, isConnect, disconnection, VerifySuccessPayment, getUserData, changeUserData, getUserDataPayAndConnect} = require("./Controller/userController");
const {SendCode, VerifyCode, sendCodeForRetrivePass} = require("./Controller/codeController");
const {Paypal,TransactionSuccess} = require("./Controller/paymentController");
const {PaymentByStripe, transactionCardSuccess} = require("./Controller/PaymentCardController");
const {mailSend} = require("./Controller/contactController")
const {userPay,  successPayment} = require("./Controller/PaymentSuccessController");
const { saveGameData, userSave, getUserGameData } = require('./Controller/gameController');
const {CaptchaGoogle} = require("./Controller/googleCaptchaController");
const {get2FAQRcode, verif2FA} = require("./Controller/2FA")

const app = express();

app.use(
  session({
    secret: "isidor",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      sameSite: false,
      domain : "localhost"
    },
  })
);
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:19006', "http://localhost:5500"],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
  
app.use(express.json());

app.post("/user/registration", Inscription);//ok
app.post("/user/connexion", Connexion)//ok
app.post("/code/reset", sendCodeForRetrivePass);//ok
app.post("/user/resetPassword", changePwd);//ok
app.post("/user/verificationAccount", SendCode);//ok
app.post("/code/VerificationCode", VerifyCode);//ok
app.post('/paiement/paypal', Paypal);//ok  
app.get('/paiement/success', TransactionSuccess);//ok
app.get('/paiement/cancel', (req, res) => res.status(400).send('Cancelled'));//ok
app.post("/paiement/stripe", PaymentByStripe);//ok
app.post("/contact/mail", mailSend);//ok
app.get("/paiement/invoice",  successPayment)//ok
app.get("/paiement/pay", userPay);//ok
app.get("/user/connect", isConnect);//ok
app.post("/user/disconnection", disconnection);//ok
app.get("/user/verificationPayment", VerifySuccessPayment);//ok
app.get("/paiement/transaction", transactionCardSuccess);//ok
app.post("/game/save", saveGameData);//ok
app.get("/user/info",getUserData);//ok
app.post("/user/change",changeUserData);//ok
app.post("/game/profile", userSave)//ok
app.get("/user/paymentConnect", getUserDataPayAndConnect)//ok
app.get("/game/userGame", getUserGameData)//ok
app.post("/google/captcha", CaptchaGoogle)//mettre le token dans l'url//ok
app.post("/authentification/qrCode", get2FAQRcode)//ok
app.post("/authentification/verification", verif2FA)

const port = 3005

const contactPort = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.listen(contactPort, () => {
  console.log(`Server is running on port ${contactPort}`);
});
