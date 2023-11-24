const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :{
        type:String,
        required:[true,"Please add the user name"]
    },
    email : {
        type: String,
        required:[true,"Please add the email"],
        unique:[true,"already email exist"]
    },
    password:{
        type:String,
        required:[true,"please add the Password"]
    }
},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);