var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

//SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
//create db model with schema above
var Campground = mongoose.model("Campground", campGroundSchema);

// //example campground object to add to db to check it is working -commented 
// //out so to not add a new campground on start up
// var campground = {
//     name:"Granite Hill", 
//     image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
//     description: "This is a huge granit hill, no bsthrooms, no water, beautiful granite"
// };

// Campground.create(campground, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });
   
    
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true}); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
            /render index page with all campgrounds
            res.render("index", {campgrounds:allCampgrounds});
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
            res.redirect("/campgrounds");
        }
    });
});

//NEW GET - form to add new camp ground
app.get("/campgrounds/new", function(req, res){
     res.render("new");
});

//SHOW  GET - request to show more info about one campground
//needs to be after campground/new or it will treat new as an id
app.get("/campgrounds/:id", function(req, res){
    
    //find campground by id that is passed in by the request
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            //render show template with found campground
            res.render("show", {campground: foundCampground});
        }
    });
});

listen on cloud9 defined port and IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server up");
});