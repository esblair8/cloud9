var     express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"), 
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose");
    
var     User           = require("./models/user"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment"),
        seedDB         = require("./seeds");
        
var     campgroundRoutes  = require("./routes/campgrounds"),
        commentRoutes     = require("./routes/comments"),
        indexRoutes       = require("./routes/index");

mongoose.Promise = global.Promise;         
mongoose.connect("mongodb://localhost/yelp_camp_v5", {useMongoClient: true}); 

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//seed database with some campgrounds
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Lynsey is very cool!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use route files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//listen on cloud9 defined port and IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server up");
});