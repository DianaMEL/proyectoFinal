const express = require("express");
const router = express.Router();
const Records = require("../models/records");


router.get('/M_record', async (req,res) => {
    const recors = await Records.find();
    console.log(recors);
    res.render('M_record', {data:recors});
})

router.get('/Records', async (req, res) => {
    res.render('Records');
});

router.post('/Records',async (req,res)=>{
    try{
        const records = new Records({
            clienta:req.body.clienta,
            marca:req.body.marca,
            descripcion:req.body.descripcion
    });

    console.log(records);

    const savedRecords = await records.save();
    if(savedRecords){
        res.redirect("/M_record");
    }else{
        res.json({error:"error al agregar"});
    }
}catch(error){
  console.log(error);
  res.sendStatus(500);
  return
}

});

router.get("/deleteRecord/:id",async(req,res) =>{
    console.log(req,params.id)
    try{
        const citaDeleted = await Records.remove({
            _id:ObjectId(req,params.id)
        })

        res.redirect("M_record");

    } catch (error){
        res.json({message:error})
    }
});

module.exports = router;