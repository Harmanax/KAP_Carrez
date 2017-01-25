var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(express.static('app_carrez'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
	response.sendfile('./index.html');
});

app.use(function (request, response, next){
	response.sendfile('./app_carrez/404.html');
});

app.listen(8080, function () {   
   console.log("Serveur lancé sur le port 8080");
});