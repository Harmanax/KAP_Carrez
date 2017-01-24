var express = require('express');
var app = express();

app.use(express.static('app_carrez'));


app.get('/', function (request, response) {
	response.sendfile('./index.html');
});

app.use(function (request, response, next){
	response.sendfile('./app_carrez/404.html');
});


app.listen(8080, function () {   
   console.log("Serveur lancé sur le port 8080");
});