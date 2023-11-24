const mongoose = require("mongoose");


const contactSchema = mongoose.Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"id is require"],
        ref: "User"
    },
    name:{
        type:String,
        required:[true,"please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"please add the email id"]
    },
    phone:{
        type:String,
        required:[true,"please add the phone no."]
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Contact",contactSchema);