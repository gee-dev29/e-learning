const paystack = require("paystack")(process.env.SECRET_KEY)

module.exports.paystackTransaction= async (req, res)=>{
    try{
    var reference;
    //init transaction
        paystack.transaction.initialize({
            email: req.body.email,
            amount: 50000
        })
        .then((body)=>{
            res.json({
                message: body
            })
            reference = body.data.reference
        })
        .catch((error)=>{
            return console.log(err.message)
        })
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports.paystackVerification = async (req,res)=>{
    try{
        paystack.transaction.verify(req.body.reference)
        .then((body)=>{
            res.json({
                message: body
            })
        })
        .catch((error)=>{
            return console.log(err.message)
        })
    }
    catch(err){
        console.log(err.message)
    }
}