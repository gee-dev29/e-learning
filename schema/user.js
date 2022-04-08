const mongoose = require("mongoose")
const json = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "super-admin"]
    },
    
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("user",userSchema);
