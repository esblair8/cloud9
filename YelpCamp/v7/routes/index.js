var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");

//passes any logged in users to all routes
router.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//===========================
//INDEX "/" ROUTE
//===========================

// LANDING PAGE GET
router.get("/", function(req, res){
    //render landing page
    res.render("landing");
});

//============================
// AUTHORIZATION ROUTES
//============================

//GET - REGISTRATION PAGE
router.get("/register", function(req, res){
    res.render("register");
});

//POST TO HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
   });
});

//GET - SHOW LOGIN PAGE
router.get("/login", function(req, res){
    res.render("login");
});

//POST TO HANDLE SIGN UP LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        //empty call back des nothing, just shows that authentication is middleware
});

//GET - LOGOUT LOGIC
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;