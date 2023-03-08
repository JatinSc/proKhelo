const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type:String,
        required : [true , 'name is required'],
    },
    email:{
        type:String,
        required : [true , 'email is required'],
        unique : [true , 'user with this email address already exists']
    },
    password:{
        type:String,
        required : [true , 'password is required'],
    },
    phone:{
        type:Number,
        required : [true , 'email is required'],
    },
    address:{
        type:String,
        required : [true , 'address is required'],
    }
})

const user = mongoose.model('User',userSchema)

module.exports = user

// module.exports = mongoose.model('User' , userSchema)
