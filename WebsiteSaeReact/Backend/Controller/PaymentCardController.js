const stripe = require('stripe')('sk_test_51OH9jAEHb0xYdWYmVl6vAlOlHOwMayIxzSDf7IjqPt6ssKtX3vMX0R5rVRNP7r6GyAvWEdtPSTBCc0cPoqaFb0g300refpnyhh');



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
            success_url: `http://localhost:19006/Success`,
            cancel_url: `http://localhost:19006/Cancel`,
            invoice_creation : {
              enabled: true,
            },
          });
          console.log(session);
          res.status(200).send({url : session.url});
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    PaymentByStripe
}