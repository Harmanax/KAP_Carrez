module.exports = function(req, res, next){

  //Under middlewares et variables locales pour tests
  var request = require('request');
  var cheerio = require('cheerio');
  var baseMA = 'https://www.meilleursagents.com/prix-immobilier/selens-02300/';
  var baseMA = 'https://www.meilleursagents.com/prix-immobilier/';

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

		      var price = $( 'h2.item_price.clearfix span.value ' ).text().trim().split( ' ' );
          data.prix = price[0] + price[1];
		      data.prix = data.prix.slice(' ', - 2);

          //BUgguée ! ne sors pas toujours le bon span
		      var area = $( $( 'h2.clearfix span.value' ).get( 2 ) ).text();
		      data.surface = area.slice(' ', - 3);

		      var address = $( $( 'h2.clearfix span.value' ).get( 1 ) ).text();
		      data.adresse = address;
          data.adresse = data.adresse.toLowerCase();
          data.adresse = data.adresse.replace(" ","-");
          data.prixSurfaceHabitable = data.prix / data.surface;



          //---variables obtenues ----
          console.log('Informations sur url :');
		      console.log(url);
          console.log(data.prix);
          console.log(data.surface);
          console.log(data.adresse);
		      console.log(data.prixSurfaceHabitable);
          //---------------------------


      }

      //FIN DU SCRAP
    });

    res.locals.data = data;
  }


  //Merci de laisser le next
  next();
}
