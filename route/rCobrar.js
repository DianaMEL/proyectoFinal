const express = require("express");
const router = express.Router();
const Ventas = require("../models/cobrar");


router.get('/Ventas', async (req,res) => {
    const ventas = await Ventas.find();
    console.log(ventas);
    res.render('Ventas', {data:ventas});
})

router.get('/cobrar_p_s', async (req, res) => {
    res.render('cobrar_p_s');
});

router.post('/cobrar_p_s',async (req,res)=>{
    try{
        const ventas = new Ventas({
            encargado:req.body.encargado,
            producto:req.body.producto,
            tipo:req.body.tipo,
            precentacion:req.body.precentacion,
            cantidad:req.body.cantidad,
            total:req.body.total
    });

    console.log(ventas);

    const savedVentas = await ventas.save();
    if(savedVentas){
        res.redirect("/Ventas");
    }else{
        res.json({error:"error al agregar"});
    }
}catch(error){
  console.log(error);
  res.sendStatus(500);
  return
}

});

router.get("/deleteVenta/:id",async(req,res) =>{
    console.log(req,params.id)
    try{
        const citaDeleted = await Ventas.remove({
            _id:ObjectId(req,params.id)
        })

        res.redirect("Ventas");

    } catch (error){
        res.json({message:error})
    }
});

module.exports = router;