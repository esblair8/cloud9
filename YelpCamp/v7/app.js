var     express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"), 
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
    
        User        = require("./models/user"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment"),
        seedDB      =require("./seeds");

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

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
//============================
// CAMPGROUND ROUTES
//============================

// LANDING PAGE GET
app.get("/", function(req, res){
    //render landing page
    res.render("landing");
});

//INDEX GET - all campgrounds and displays them in campgrounds page
app.get("/campgrounds", function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            //render index page with all campgrounds
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE POST - route to add new campground to database
app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description: description};
    
    //Create a new campground and save to the database
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds/");
        }
    });
});

//NEW GET - form to add new camp ground
app.get("/campgrounds/new", function(req, res){
     res.render("campgrounds/new");
});

//SHOW  GET - request to show more info about one campground
//needs to be after campground/new or it will treat new as an id
app.get("/campgrounds/:id", function(req, res){
    
    //find campground by id that is passed in by the request
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            //render show template with found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//============================
// COMMENT ROUTES
//============================

//NEW GET - COMMENTS form to add new camp ground
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         }
         else{
            res.render("comments/new", {campground: campground});
         }
     });
    
});

//NEW GET - COMMENTS form to add new camp ground
app.post("/campgrounds/:id/comments/", isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
            res.redirect("/campgrounds");
         }
         else{
            //create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }//if
               else{
                   //connect comment to campground
                   campground.comments.push(comment);
                   campground.save();
                   
                   //redirect campground show page
                   res.redirect("/campgrounds/" + campground._id);
               }//else
           });
         }
     });
});

//============================
// AUTHORIZATION ROUTES
//============================

//GET - REGISTRATION PAGE
app.get("/register", function(req, res){
    res.render("register");
});

//POST TO HANDLE SIGN UP LOGIC
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
    res.render("login");
});

//POST TO HANDLE SIGN UP LOGIC
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        //empty call back des nothing, just shows that authentication is middleware
});

//GET - LOGOUT LOGIC
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});
//middleware function to check if user is logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//listen on cloud9 defined port and IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server up");
});