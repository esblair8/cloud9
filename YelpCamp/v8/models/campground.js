var mongoose    = require("mongoose");

//SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
   comments: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Comment"
            }
        ]
});
//create db model with schema above
module.exports = mongoose.model("Campground", campGroundSchema);

