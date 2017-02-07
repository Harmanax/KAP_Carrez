module.exports = function(req, res, next){

  //Under middlewares et variables locales pour tests
  var cheerio = require('cheerio');
  var test_MA = 'https://www.meilleursagents.com/prix-immobilier/selens-02300/';


  //ICI METTRE MODULES DE NOTRE Middleware
  req.getData = function(url){
    console.log("on est dans getData");
    request(url, function(err, resp, body){
      // DEBUT DU SCRAP

      if(!err && resp.statusCode === 200){
        var $ = cheerio.load(body);
        $('properties', 'properties')
      }

      //FIN DU SCRAP
    });
  }


  //Merci de laisser le next
  next();
}
