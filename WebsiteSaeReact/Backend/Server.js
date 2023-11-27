const express = require('express');
const app = express();
const cors = require('cors');
const {Inscription, Connexion} = require("./Controller/userController");
const {SendCode, VerifyCode} = require("./Controller/codeController");
const {Paypal,TransactionSuccess} = require("./Controller/paymentController");
const {mailSend} = require("./Controller/contactController")

app.use(cors({
    allowedHeaders: ['Content-Type']
}));
  
app.use(express.json());
app.post("/inscription", Inscription);
app.post("/connexion", Connexion)
app.post("/SendCode", SendCode);
app.post("/VerifyCode", VerifyCode);
app.post('/pay', Paypal);  
app.get('/success', TransactionSuccess);
app.get('/cancel', (req, res) => res.status(400).send('Cancelled'));

app.post("/contact", mailSend);

const port = 3005

const contactPort = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.listen(contactPort, () => {
  console.log(`Server is running on port ${contactPort}`);
});


