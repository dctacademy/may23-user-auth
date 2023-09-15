const mongoose = require('mongoose')
const { Schema, model } = mongoose 
const userSchema = new Schema({
    username: String,
    email: String,
    password: String
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User 

// when you have multiple property definition for a field 
// username: {
//     type: String, 
//     required: true 
// },
// email: {
//     type: String,
//     required: true 
// },
// password: {
//     type: String,
//     required: true
//     minlength: 8
// }
// 3 types validations
// client side, express validation, mongoose validation