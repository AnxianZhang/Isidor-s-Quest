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

app.post("/user/registration", Inscription);
app.post("/user/connexion", Connexion)
app.post("/code/reset", sendCodeForRetrivePass);
app.post("/user/resetPassword", changePwd);
app.post("/user/verificationAccount", SendCode);
app.post("/code/VerificationCode", VerifyCode);
app.post('/paiement/paypal', Paypal);
app.get('/paiement/success', TransactionSuccess);
app.get('/paiement/cancel', (req, res) => res.status(400).send('Cancelled'));
app.post("/paiement/stripe", PaymentByStripe);
app.post("/contact/mail", mailSend);
app.get("/paiement/invoice",  successPayment)
app.get("/paiement/pay", userPay);
app.get("/user/connect", isConnect)
app.post("/user/disconnection", disconnection);
app.get("/user/verificationPayment", VerifySuccessPayment);
app.get("/paiement/transaction", transactionCardSuccess);
app.post("/game/save", saveGameData);
app.get("/user/info",getUserData);
app.post("/user/change",changeUserData);
app.post("/game/profile", userSave)
app.get("/user/paymentConnect", getUserDataPayAndConnect)
app.get("/game/userGame", getUserGameData)
app.get("/google/captcha", CaptchaGoogle)
app.post("/authentification/qrCode", get2FAQRcode)
app.post("/authentification/verification", verif2FA)

const port = 3005

const contactPort = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.listen(contactPort, () => {
  console.log(`Server is running on port ${contactPort}`);
});
