var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

//============================
// COMMENT ROUTES
//============================

//NEW GET - COMMENTS FORM TO ADD NEW CAMP GROUND
router.get("/new", isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         }//if
         else{
            res.render("comments/new", {campground: campground});
         }//else
     });//callback
});//callback

//NEW GET - COMMENTS form to add new camp ground
router.post("/", isLoggedIn, function(req, res){
    //LOOKUP CAMPGROUND BY ID
    Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
            res.redirect("/campgrounds");
         }//if
         else{
            //CREATE NEW COMMENT
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }//if
               else{
                   //GET LOGGED IN USER DETAILS
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //SAVE THEM TO COLLECTION
                   comment.save();
                   //ADD COMMENT REFERENCE TO CAMPGROUND
                   campground.comments.push(comment);
                   //SAVE CAMPGROUND
                   campground.save();
                   //REDIRECT CAMPGROUND SHOW PAGE
                   res.redirect("/campgrounds/" + campground._id);
               }//else
           });//callback
         }//else
     });//callback
});//callback

//CREATE - GET COMMENT EDIT PAGE
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       }//if
       else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }//else
    });//callback
});//callback

//UPDATE - PUT COMMENT TO DB
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }//if
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }//else
    });//callback
});//callback

//DESTROY - DELETE COMMENTS
router.delete("/:comment_id", function(req, res){
    //find comment
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.redirect("back");
        }//if
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }//else
    });//callback
    //delete comment
});//callback


//============================
//MIDDLEWARE FUNCTIONS
//============================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }//if
    res.redirect("/login");
}//isLoggedIn

module.exports = router;