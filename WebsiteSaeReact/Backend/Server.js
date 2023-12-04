const express = require('express');
const app = express();
const cors = require('cors');
const {Inscription, Connexion, isConnect, disconnection} = require("./Controller/userController");
const {SendCode, VerifyCode} = require("./Controller/codeController");
const {Paypal,TransactionSuccess} = require("./Controller/paymentController");
<<<<<<< Updated upstream
=======
const {PaymentByStripe} = require("./Controller/PaymentCardController");
const {mailSend} = require("./Controller/contactController")
const {userPay, successPayment} = require("./Controller/PaymentSuccessController");
const cookieParser = require("cookie-parser");
>>>>>>> Stashed changes

app.use(cors({
    allowedHeaders: ['Content-Type']
}));
  
app.use(express.json());

app.use(cookieParser());

app.post("/inscription", Inscription);
app.post("/connexion", Connexion)
app.post("/SendCode", SendCode);
app.post("/VerifyCode", VerifyCode);
app.post('/pay', Paypal);  
app.get('/success', TransactionSuccess);
app.get('/cancel', (req, res) => res.status(400).send('Cancelled'));
<<<<<<< Updated upstream


=======
app.post("/charge", PaymentByStripe);
app.post("/successPayment", successPayment)
app.post("/contact", mailSend);
app.post("/isPay", userPay);
app.post("/isConnect", isConnect);
app.post("/disconnection", disconnection);
>>>>>>> Stashed changes
const port = 3005

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

<<<<<<< Updated upstream
=======
app.listen(contactPort, () => {
  console.log(`Server is running on port ${contactPort}`);
});
>>>>>>> Stashed changes
