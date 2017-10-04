var express = require("express");
var app = express();

//home page
app.get("/", function(req, res){
    res.send("Hi there welcome to my assignment");
});

//match an animal to its noise
app.get("/speak/:animal", function(req, res){
    
    var sounds = {
        pig: "Oink!",
        cat: "Meow!",
        dog: "Woof Woof!",
        sheep: "Baa Baa!",
        cow: "Moo!"        
    };
    
    var animal = req.params.animal.toLowerCase();
    var message = sounds[animal];
    
    res.send(message);
    
});
//repeat a word a number of times
app.get("/repeat/:word/:count", function(req, res){
    
    var message = "";
    
    for(var i=0; i<req.params.count; i++){
        message += req.params.word + " ";
    };
    
    console.log(message);
    res.send(message);
});

//catch all for uknown urls
app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});