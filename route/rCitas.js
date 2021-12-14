const express = require("express");
const router = express.Router();
const Citas = require("../models/citas");


router.get('/T_citas', async (req,res) => {
    const citas = await Citas.find();
    console.log(citas);
    res.render('T_citas', {data:citas});
})

router.get('/citas', async (req, res) => {
    res.render('citas');
});

router.post('/citas',async (req,res)=>{
    try{
        const citas = new Citas({
            nombre:req.body.nombre,
            telefono:req.body.telefono,
            servicio:req.body.servicio,
            hora:req.body.hora
    });

    console.log(citas);

    const savedCitas = await citas.save();
    if(savedCitas){
        res.redirect("/T_citas");
    }else{
        res.json({error:"error al agregar"});
    }
}catch(error){
  console.log(error);
  res.sendStatus(500);
  return
}

});

router.get("/deleteCita/:id",async(req,res) =>{
    console.log(req,params.id)
    try{
        const citaDeleted = await Citas.remove({
            _id:ObjectId(req,params.id)
        })

        res.redirect("T_citas");

    } catch (error){
        res.json({message:error})
    }
});

module.exports = router;