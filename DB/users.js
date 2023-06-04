const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model('users',userSchemas)