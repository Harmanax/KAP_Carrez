module.exports = function(req, res, next){

  //Under middlewares et variables locales pour tests
  var request = require('request');
  var cheerio = require('cheerio');

  //ICI METTRE MODULES DE NOTRE Middleware
  req.checkPrice = function(data){

    //travailler le ville et le prixmk

    //----
    request(url, function(err, resp, body){
      // DEBUT DU SCRAP

      if(!err && resp.statusCode === 200){
        var $ = cheerio.load(body);

      }

      //FIN DU SCRAP
    });
  }


  //Merci de laisser le next
  next();
}
