const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    expertise:{
        type: String,
        require: false
    }
});

module.exports = mongoose.model('User',userScheme);