const mongoose = require('mongoose')
//const url = require("check-url-type")

const collegeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    logoLink:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Colleges', collegeSchema)