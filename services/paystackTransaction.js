const paystack = require("paystack")(process.env.TOKEN_SECRET);
const paymentData = require("../schema/paystackModel")
require('dotenv').config()

module.exports.paystackTransaction = async (req, res) => {
  const  {email, amount, item} = req.body;
  try {
    //init transaction
    paystack.transaction
      .initialize({
        PUBLIC_KEY: process.env.PUBLIC_KEY,
        email: email,
        amount: amount,
        item: item
      })
      
      .then((body) => {
        res.json({
          message: body
        });  

        paystack.transaction.verify(body.data.reference)
        .then((body) => {
            const data = paymentData({
              paymentDetails : body.data
            })
            data.save()
          })
          .catch((error) => {
            return console.log(error.message);
          });
      })
      .catch((error) => {
        return console.log(error.message);
      });
  } catch (err) {
    console.log(err.message);
  }
};
