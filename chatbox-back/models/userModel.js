
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    date_of_birth: {type: Date, require: true},
    state: {type: String, require: true},
    telNumber: {type: Number, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel  
