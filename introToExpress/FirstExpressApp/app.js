var express = require("express");

var app = express();

// "/" === "Hi There!"
app.get("/", function(req, res){
  console.log("request made - home")
  res.send("Hi There!"); 
});

// "/bye" === "GoodBye!"
app.get("/", function(req, res){
  console.log("request made - bye")
  res.send("GoodBye!"); 
});

// "/dog" === "MEOW!"
app.get("/cat", function(req, res){
  console.log("request made - cat")
  res.send("MEOW!"); 
});

app.get("/help/:catname", function(req, res){
  console.log("request made - cat/something")
    console.log(req.params)

  res.send("MEOW!"); 
});

//any request that is not home, bye or cats will return this 
app.get("*", function(req, res){
  console.log("request made - unknown url")
  res.send("You are a star"); 
});

//listen on port that could 9 sets
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});


