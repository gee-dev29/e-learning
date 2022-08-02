const paystack = require("paystack")(process.env.SECRET_KEY);
require("dotenv").config();

module.exports.createCustomer = async (req, res) => {
  try {
    // create a new customer
    paystack.customer
      .create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      })
      .then((body) => {
          paystack.subscription
            .create({
              customer: body.data.email,
              plan: "PLN_m7zp3hjb3wyxyyx",
              authorization: `Bearer process.env.SECRET_KEY`
              
            }, (error, body)=> {
                  if(error){
                      res.json({
                          message:error
                      })
                  };
                  res.json({
                      // message:body,
                      subscription_id : body.data.id,
                      subscription_code : body.data.subscription_code,
                      token : body.data.email_token
                  })
            })
        })
      .catch((error) =>
        res.json({
          message: error,
        })
      );

    } catch (error) {
    return error.message;
  }
};
// module.exports.paystackSubscription = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error.message);
//   }
// };
module.exports.updateCustomer = async (req, res) => {
  try {
    paystack.customer
      .update(req.body.customer_id, { first_name: req.body.firstame })
      .then((body) => {
        res
          .json({
            message: body,
          })
          .catch((error) => {
            res.json({
              message: error.message,
            });
          });
      });
  } catch (error) {
    return error.message;
  }
};
// fetch customer
module.exports.fetchCustomer = async (req, res) => {
  try {
    paystack.customer.get(customer_id).then((body) => {
      res.json({
        message: body,
      });
    });
  } catch (error) {
    return error.message;
  }
};
//list customer
module.exports.listCustomers = async (req, res) => {
  try {
    paystack.customer.list().then((body) => {
      res.json({
        message: body,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
