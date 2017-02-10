module.exports = function(req, res, next){

  //Under middlewares et variables locales pour tests
  var request = require('request');
  var cheerio = require('cheerio');
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


          var area = $( $( 'h2.clearfix span.value' ).get( 2 ) ).text();
  		      data.surface = area.slice(' ', - 3);

  			  var check = $( $( 'h2.clearfix span.value' ).get( 3 ) ).text();


  			  if (typeof data.surface === 'string' || data.surface instanceof String )
  			  {
  				 var area = $( $( 'h2.clearfix span.value' ).get( 4 ) ).text();
  		      data.surface = area.slice(' ', - 3);
  			  }
  			  else if ((typeof data.surface === 'string' || data.surface instanceof String) && (typeof check === 'string' || check instanceof String) )
  			  {
  				  var area = $( $( 'h2.clearfix span.value' ).get( 5 ) ).text();
  		      data.surface = area.slice(' ', - 3);
  			  }

		      var address = $( $( 'h2.clearfix span.value' ).get( 1 ) ).text();
		      data.adresse = address;
          data.adresse = data.adresse.replace("\n","");
          data.adresse = data.adresse.toLowerCase();
          data.adresse = data.adresse.replace(" ","-");
          data.adresse.trim();



          //---variables obtenues ----
          console.log('Informations sur url :');
		      console.log(url);
          console.log(data.prix);
          console.log(data.surface);
          console.log(data.adresse);
		      console.log(data.prixSurfaceHabitable);
          //---------------------------

          //ScrapMA

          var newURL = 'https://www.meilleursagents.com/prix-immobilier/'+data.adresse;
          console.log(newURL);

          request(newURL, function(err, resp, body){
            // DEBUT DU SCRAP
            if(!err && resp.statusCode === 200){
              var $ = cheerio.load(body);

              //#
              //# SCRAP MEILLER AGENT
              /*
              var medPrice = $('div.small-4.medium-2.columns.prices-summary__cell--median').text().trim().split( ' ' );
              medPrice = medPrice[0] + medPrice[1];
              medPrice = medPrice.slice(' ', -1);
              medPrice = medPrice.replace(/&nbsp;/,"");
              */
              var medPrice = $('div.small-4.medium-2.columns.prices-summary__cell--median').text();
              medPrice = medPrice.replace( /[^\d.]/g,'');
              medPrice = medPrice.replace("\n","");
              medPrice = medPrice.trim();

              console.log('prix moyen : ');
              console.log(medPrice);
              //#
              //#
              //fin de traitement ok
              var isOK = false;
              data.prixSurfaceHabitable = medPrice*data.surface;
              console.log('prix conseillé :');
              console.log(data.prixSurfaceHabitable);
              if(data.prix <= data.prixSurfaceHabitable){
                isOK = true;
              }
              res.render('../views/pages/results', {
                adress: data.adresse,
                prix: data.prix,
                surface: data.surface,
                prixMoy: medPrice,
                prixSurfaceHabitable: data.prixSurfaceHabitable,
                test: isOK
              });
            }
            else{
              res.render('../views/pages/results', {
                adress: false,
                message : 'Erreur URL, echec analyse'
              });
            }

            //FIN DU SCRAP
          });

          // renvoi final


      }
      else {
          res.render('../views/pages/index',{ message: 'Adresse invalide'});
      }
      //cas où mauvais adresse entrée


      //FIN DU SCRAP
    });
  }


  //Merci de laisser le next
  next();
}
