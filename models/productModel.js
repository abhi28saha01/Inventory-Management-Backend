const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    quantity : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending","Approved","Rejected"],
        default : "Pending"
    }
});

module.exports = mongoose.model('Product',productSchema);