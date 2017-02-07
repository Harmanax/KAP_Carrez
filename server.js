var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var url_test = 'https://www.leboncoin.fr/ventes_immobilieres/1089785228.htm?ca=12_s';
var var_test = 'SALOPE';

//Moteur de templates
app.set('view engine', 'ejs');

//---------------Middleware--------------
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('./middlewares/ScrapLBC'))

//----------ROUTAGE----------------------
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.post('/', function(req, res){

  if(req.body.LBC === undefined || req.body.LBC === ''){
    res.render('pages/index', {message: "Veuillez entrer une url !"});
  }


  //########## APPEL DU SCRAP (un middleware) ############
  req.getData(url_test);

});
//----------FIN DE ROUTAGE----------------

//SI PAGE INTROUVABLE
app.use(function(req, res, next){
    res.render('pages/index', {message: "page introuvable"});
});
//PORT D'ECOUTE
app.listen(8080, ()=>{
  console.log("Serveur lancé sur le port 8080");
});



//Ligne 520 LBC
//Ligne 521 Argent (content)
//Ligne 546 address 
//Ligne 592 Metre carre