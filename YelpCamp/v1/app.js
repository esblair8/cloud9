var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name:"Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name:"Castle Rock", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
    {name:"Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name:"Castle Rock", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
    {name:"Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name:"Castle Rock", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
    {name:"Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name:"Castle Rock", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"}
    ];
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name: name, image: image};
    campgrounds.push(newCampGround);
    
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res){
     res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server up");
});