var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    
    {name: "cloud's rest", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/JYTXN7PS1M.jpg",
    description: "nature, landscape, trees, woods, forest, hammocks, camping, travel"},
    
    {name: "farm hill", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EUJZ6P6236.jpg",
    description: "travel, tent, camping, nature, landscape, grass, sky"},
    
    {name: "camp fire point", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/46KA49PBET.jpg",
    description: "fire, dark, night, camping, travel, adventure, spark"},
    
    {name: "campy camp", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/CADPJRFJNZ.jpg",
    description: "mountain, highland, cloud, sky, summit, ridge, landscape, nature, valley, " 
    + "hill, view, travel, climbing, camping, morning, sunrise, grass"}
    
    ];
 

function seedDB(){
    //remoce all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
        console.log("removed campgrounds!");
        }
            //add some campgrounds
            data.forEach(function(seed){
               Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   }
                   else{
                       console.log("added a campground");
                       //create a comment
                       Comment.create(
                           {
                             text: "This place is the bee's knee's",
                             author: "Lynsey Lamont"
                           }, function(error, comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("added a comment to campgorund");
                                }
                           }
                       );
                   }
               }); 
            });
    });
  
    
}//seedDB


module.exports = seedDB;