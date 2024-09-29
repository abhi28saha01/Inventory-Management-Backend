const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true,
    },
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true,
    },
    token : {
        type : String,
        default : undefined
    },
    accountType: {
      type: String,
      enum: ["Admin", "Public"],
      default : "Public",
      required: true,
    },
    password : {
        type : String,
        required : true,
    },
    resetPasswordExpires: {
        type: Date,
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }]
});

module.exports = mongoose.model('User',userSchema);