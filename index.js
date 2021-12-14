const express = require("express");
const engine = require('ejs-mate');
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const flash = require("connect-flash");

const app = express()
const puerto = 3000;

app.use('*/img',express.static('public/img'));
app.set('views', path.join(__dirname, 'public/views'))
app.engine('ejs', engine);
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("dev"));
app.use(session({
    secret:"secretoMeli",
    resave: false,
    saveUninitialized:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash("signinMessage");
    app.locals.signupMessage = req.flash("signinMessage");
    app.locals.user = req.user;
    next();
});

const login = require("./route/rLogin");
app.use(login);

const rUsers = require("./route/rUsers");
app.use(rUsers); 

const rCitas = require("./route/rCitas");
app.use(rCitas);

const rCobrar = require("./route/rCobrar");
app.use(rCobrar);

const rRecords = require("./route/rRecords");
app.use(rRecords);

app.get("/",(req,res,next) => {
    if(req.isAuthenticated())
    return next();
    res.redirect("/login");
    },function(req,res){
        res.render("index")
});



mongoose.connect(
    "mongodb://localhost:27017/proyecto",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true},
    () => console.log("conexion a la base de datos exitosa")
);

app.listen(puerto,()=>{
    console.log( `servidor puerto ${puerto}`);
});
