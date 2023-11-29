const stripe = require('stripe')('sk_test_51OH9jAEHb0xYdWYmVl6vAlOlHOwMayIxzSDf7IjqPt6ssKtX3vMX0R5rVRNP7r6GyAvWEdtPSTBCc0cPoqaFb0g300refpnyhh');



const PaymentByStripe = async (req, res) => {
    try {
        /*res.header("Access-Control-Allow-Origin", "*");
        const customer = await stripe.customers.create({
                name: req.body.name,
                email: req.body.email,
                source: "tok_visa"
        })
        const charge = await stripe.charges.create({
            amount: 2500,
            currency: "eur",
            customer: customer.id
        })
        console.log(charge);    
        res.status(200).send({url : charge.receipt_url});*/
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1OHjyzEHb0xYdWYmtXr9rMbv',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:19006/`,
            cancel_url: `http://localhost:19006/`,
          });
          
          res.status(200).send({url : session.url});
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    PaymentByStripe
}