const mongoose = require("mongoose");

const cobrarSchema = mongoose.Schema({
    encargado:{
        type:String,
        require:true
    },
    producto:{
        type:String,
        require:true
    },
    tipo:{
        type:String,
        require:true
    },
    precentacion:{
        type:String,
        require:true
    },
    cantidad:{
        type:String,
        require:true
    },
    total:{
        type:Number,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Cobrar",cobrarSchema);