const mongoose = require('mongoose')

const teachersSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: "This field is required"
    },
    email:{
        type: String,
        required: "This field is required" 
    },
    password:{
        type: String,
        required: "This field is required",
        min: 6,
        max: 1024
    },
    mobile:{
        type: String,
        required : "This field is required"
    }
})

module.exports=mongoose.model('Teacher',teachersSchema)