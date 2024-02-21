const stripe = require('stripe')('sk_test_51OH9jAEHb0xYdWYmVl6vAlOlHOwMayIxzSDf7IjqPt6ssKtX3vMX0R5rVRNP7r6GyAvWEdtPSTBCc0cPoqaFb0g300refpnyhh');
const mongoose = require('mongoose');
const { User } = require("../Models/Model")

const PaymentByStripe = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1OHnifEHb0xYdWYm60Xo2Zhb',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:3005/paiement/transaction`,
            cancel_url: `http://localhost:19006/Cancel`,
            invoice_creation : {
              enabled: true,
            },
          });
          req.session.checkoutid = session.id;
          res.status(200).send({url : session.url});
    } catch (err) {
        res.send(err);
    }
}

const transactionCardSuccess = (req,res) =>{
  req.session.succesPayment = true;
  res.redirect('http://localhost:19006/Success');
}
const RetrieveInvoiceURL = async (checkoutid) => {
  const session = await stripe.checkout.sessions.retrieve(checkoutid);
  const invoice = await stripe.invoices.retrieve(session.invoice);
  return invoice.hosted_invoice_url ;
}

module.exports = {
    PaymentByStripe,
    transactionCardSuccess,
    RetrieveInvoiceURL
}