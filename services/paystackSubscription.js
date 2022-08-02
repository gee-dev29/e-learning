const paystack = require("paystack")(process.env.SECRET_KEY)

// module.exports.paystackSubscription = async (req,res)=>{

//     try {
//         paystack.subscription.create({
//             customer: body.email,
//             plan:body.plan
//             // authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lciI6ImVtbWFpZHVzQGdtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.NrKtHb47EZWfUGji3Rn_h6xjVRDWRG8HfLoOTUZM35c"
//         })
//         .then((body)=>{
//             res.json({
//                 message:body
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 message: err.message
//             })
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// }