const mongoose = require ("mongoose")

const paystackSchema =new mongoose.Schema({
    paymentDetails: {
        type : Array,
    }
})


module.exports = mongoose.model("payment", paystackSchema)
