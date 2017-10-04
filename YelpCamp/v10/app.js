//PACKAGES
var     express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"), 
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"),
        passportLocalMongoose   = require("passport-local-mongoose");
        
//MODELS    
var     User           = require("./models/user"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment"),
        seedDB         = require("./seeds");
        
//ROUTES        
var     campgroundRoutes  = require("./routes/campgrounds"),
        commentRoutes     = require("./routes/comments"),
        indexRoutes       = require("./routes/index");

//SET UP MOGNOOSOE ON LOCAL HOST
mongoose.Promise = global.Promise;         
mongoose.connect("mongodb://localhost/yelp_camp_v10", {useMongoClient: true}); 

//USE BODY PARSER TO PARSE REQUESTS
app.use(bodyParser.urlencoded({extended: true}));

//SET VIEW ENGINE TO BE EJS
app.set("view engine", "ejs");

//SERVE THE PUBLIC DIRECTORY
app.use(express.static(__dirname + "/public"));

//USE METHOD OVERRIDE TO HANDLE PUT AND DELETE REQUESTS
app.use(methodOverride("_method"));

//SEED DATABASE WITH SOME CAMPGROUNDS
//seedDB();

//PASSPORT CONFIG FOR AUTHENTICATION
app.use(require("express-session")({
    secret: "Lynsey is very cool!",
    resave: false,
    saveUninitialized: false
}));//app.use

//PASSPORT INTITIALISATION FOR AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USE ROUTE FILES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//LISTEN ON CLOUD9 DEFINED PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server up");
});//callback