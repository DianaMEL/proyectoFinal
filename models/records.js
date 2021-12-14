const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
    clienta:{
        type:String,
        require:true
    },
    marca:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Records",recordSchema);