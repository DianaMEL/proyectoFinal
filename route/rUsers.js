const express = require("express");
const router = express.Router();
const Users = require("../models/user");

router.get("/usuario", async(req,res) => {
    try{
        const user = await Users.find();
        res.json(user);
    } catch(error){
        console.log("Error"+error);
        res.json({message:error});
    }
});

module.exports = router;

