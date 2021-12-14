const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require('bcrypt');
const passportLocal = require("passport-local").Strategy;

const Users = require("../models/user");
const res = require("express/lib/response");

passport.serializeUser(function(user,done){
  done(null,user.id);
})

passport.deserializeUser(async function(id,done){
  const user = await Users.findById(id);
  done(null,user);
})
  
router.get('/login', (req, res, next) => {
  res.render('login');
});

passport.use("authenticate", new passportLocal({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
},
async function(req,email,password,done){
  console.log(email,password);
  const user = await Users.findOne({username: email});
  console.log(user);
  if(!user){
    return done(null,false,req.flash("signinMessage", "Email No Encontrado"));
  }
  if(!user.comparePassword(password)){
    return done(null,false,req.flash("signinMessage", "Password Incorrecto"));
  }
  done(null,user);
}));

router.post("/login", passport.authenticate("authenticate",{
  successRedirect:"/",
  failureRedirect:"/login"
}));


router.get('/registro', (req, res, next) => {
  res.render('registro');
});

router.post('/registro',async (req,res,next)=>{
  const salt = await bcrypt.genSalt(10);
  const hashecPassword = await bcrypt.hash(req.body.password,salt);

  const usuario = new Users({
      username:req.body.email,
      password:hashecPassword,
  });

  console.log(usuario);
  try{
    const savedUser = await usuario.save();
    if(savedUser){
      res.redirect("/");
    }else{
      res.render("/registrar");
    }
  }catch(err){
    console.log(err);
    res.send("Error");
  }
  
});

router.get("/salir", (req,res,next) => {
  req.logout();
  res.redirect("/")
});

  router.get('/cobrar_producto', (req, res, next) => {
    res.render('cobrar_producto');
  });

  router.get('/Records', (req, res, next) => {
    res.render('Records');
  });

  module.exports = router;