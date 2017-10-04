var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    
    {name: "Cloud's Rest", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/JYTXN7PS1M.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut neque finibus, efficitur enim et, egestas eros. Praesent vel augue non justo dapibus dapibus ullamcorper sed quam. Curabitur id placerat sem, et lacinia massa. Sed dignissim enim magna, ut rhoncus lectus sagittis sit amet. Aenean euismod tellus libero, dignissim luctus justo elementum vel. Etiam et bibendum nisi, at finibus velit. Sed mattis tellus vulputate dui dapibus, non pretium magna tempus. Fusce nec nisl vitae dolor ultricies pellentesque at vel metus. Duis varius libero vel semper elementum. Integer mattis lorem ac consequat porta. "},
    
    {name: "Farm Hill", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EUJZ6P6236.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut neque finibus, efficitur enim et, egestas eros. Praesent vel augue non justo dapibus dapibus ullamcorper sed quam. Curabitur id placerat sem, et lacinia massa. Sed dignissim enim magna, ut rhoncus lectus sagittis sit amet. Aenean euismod tellus libero, dignissim luctus justo elementum vel. Etiam et bibendum nisi, at finibus velit. Sed mattis tellus vulputate dui dapibus, non pretium magna tempus. Fusce nec nisl vitae dolor ultricies pellentesque at vel metus. Duis varius libero vel semper elementum. Integer mattis lorem ac consequat porta. "},
    
    {name: "Camp Fire Point", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/46KA49PBET.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut neque finibus, efficitur enim et, egestas eros. Praesent vel augue non justo dapibus dapibus ullamcorper sed quam. Curabitur id placerat sem, et lacinia massa. Sed dignissim enim magna, ut rhoncus lectus sagittis sit amet. Aenean euismod tellus libero, dignissim luctus justo elementum vel. Etiam et bibendum nisi, at finibus velit. Sed mattis tellus vulputate dui dapibus, non pretium magna tempus. Fusce nec nisl vitae dolor ultricies pellentesque at vel metus. Duis varius libero vel semper elementum. Integer mattis lorem ac consequat porta. "},
    
    {name: "Campy Camp", 
    image: "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/CADPJRFJNZ.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut neque finibus, efficitur enim et, egestas eros. Praesent vel augue non justo dapibus dapibus ullamcorper sed quam. Curabitur id placerat sem, et lacinia massa. Sed dignissim enim magna, ut rhoncus lectus sagittis sit amet. Aenean euismod tellus libero, dignissim luctus justo elementum vel. Etiam et bibendum nisi, at finibus velit. Sed mattis tellus vulputate dui dapibus, non pretium magna tempus. Fusce nec nisl vitae dolor ultricies pellentesque at vel metus. Duis varius libero vel semper elementum. Integer mattis lorem ac consequat porta. "}
    
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