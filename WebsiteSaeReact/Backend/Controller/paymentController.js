const {successPayment} = require("./PaymentSuccessController");
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'AWEySLOkTw_Nd9GzekOC3UMfHoC2BLUqiPGv98cZpwm1wSUD0Djk91lxDcN79tfpihNKrSlgTHXewAbf',
    'client_secret': 'EEdUghJ6D2QSwy9M-Gm-dfAMpMjTySUtlg6Y1fkJ_9uNpXoxD534mqV_mn8todZ9n9NuAYHQRQ8ZRUTa'
  });
  
const Paypal = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3005/success",
          "cancel_url": "http://localhost:19006/Cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Isidor's Quest Game",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "EUR",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "EUR",
              "total": "25.00"
          },
          "description": "The best game"
      }]
  };  
  
  paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){

                res.status(200).send({forwardLink: payment.links[i].href});
              }
            }
        }
      });}

const TransactionSuccess = async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "EUR",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
        successPayment();
        res.redirect('http://localhost:19006/Success');
      }
  });
  };    

module.exports = {
Paypal,
TransactionSuccess
};