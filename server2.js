var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/app_carrez'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile('index.html');
});

//----------------------------
app.post('/submit', function(req, res) {
    console.log(req.body.LBC);
    //res.sendFile('index.html' , { root : __dirname + '/app_carrez'});
});


//----------------------------


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile('404.html');
});

app.listen(8080, function () {   
   console.log("Serveur lancé sur le port 8080");
});	