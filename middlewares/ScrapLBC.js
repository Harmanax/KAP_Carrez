module.exports = function(req, res, next){

  //Under middlewares et variables locales pour tests
  var request = require('request');
  var cheerio = require('cheerio');
  var test_MA = 'https://www.meilleursagents.com/prix-immobilier/selens-02300/';

  var data = {
    prix: 0,
    surface: 0,
    adresse: "",
    prixSurfaceHabitable: 0,
  }

  //ICI METTRE MODULES DE NOTRE Middleware
  req.getData = function(url){
    console.log("on est dans getData");
    request(url, function(err, resp, body){
      // DEBUT DU SCRAP

      if(!err && resp.statusCode === 200){
        var $ = cheerio.load(body);
        $('properties', 'properties')

        //---variables obtenues ----
        console.log('Informations sur url :');
        console.log(data.prix);
        console.log(data.surface);
        console.log(data.adresse);
        //---------------------------
      }

      //FIN DU SCRAP
    });
  }


  //Merci de laisser le next
  next();
}
