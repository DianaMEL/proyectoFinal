const mongoose = require("mongoose");

const citaSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    telefono:{
        type:Number,
        require:true
    },
    servicio:{
        type:String,
        require:true
    },
    hora:{
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Citas",citaSchema);