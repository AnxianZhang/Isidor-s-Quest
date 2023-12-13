const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  session({
    secret: "isidor",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      sameSite: false,
    },
  })
);
app.use(cookieParser());
const cors = require('cors');
const {Inscription, Connexion, changePwd, isConnect, disconnection, VerifySuccessPayment} = require("./Controller/userController");
const {SendCode, VerifyCode, sendCodeForRetrivePass} = require("./Controller/codeController");
const {Paypal,TransactionSuccess} = require("./Controller/paymentController");
const {PaymentByStripe, transactionCardSuccess} = require("./Controller/PaymentCardController");
const {mailSend} = require("./Controller/contactController")
const {userPay, successPayment} = require("./Controller/PaymentSuccessController");


app.use(cors({
  origin: 'http://localhost:19006',
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
  
app.use(express.json());

app.post("/inscription", Inscription);
app.post("/connexion", Connexion)
app.post("/sendCodeForRetrivePass", sendCodeForRetrivePass);
app.post("/changePwd", changePwd);
app.post("/SendCode", SendCode);
app.post("/VerifyCode", VerifyCode);
app.post('/pay', Paypal);  
app.get('/success', TransactionSuccess);
app.get('/cancel', (req, res) => res.status(400).send('Cancelled'));
app.post("/charge", PaymentByStripe);
app.post("/contact", mailSend);
app.post("/successPayment", successPayment)
app.post("/isPay", userPay);
app.post("/isConnect", isConnect);
app.post("/disconnection", disconnection);
app.get("/verifyPayment", VerifySuccessPayment);
app.get("/transactionCardSuccess", transactionCardSuccess);

const port = 3005

const contactPort = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.listen(contactPort, () => {
  console.log(`Server is running on port ${contactPort}`);
});
