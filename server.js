var express = require('express');
var bodyParser = require("body-parser");
var url = require("url");

var url_lbc = "ad-lbc";
var app = express();


app.use(express.static('app_carrez'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
	response.sendFile('./index.html');
});

app.use(function (request, response, next){
	response.sendFile('./app_carrez/404.html');
});

app.listen(8080, function () {   
   console.log("Serveur lancé sur le port 8080");
});