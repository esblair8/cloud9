var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
});

/* GET contact us page. */
app.get('/destinations', function(req, res){
    console.log(req)
    res.render('destination-cities');
});

/* GET contact us page. */
app.get('/contact', function(req, res){
    console.log(req)
    res.render('contact');
});


//catch all 404 errors
app.get("*", function(req, res){
  res.render('404'); 
});

//listen on cloud9 defined port and IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('https://learn-web-dev2-evan117.c9users.io/');
});