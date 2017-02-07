module.exports = function(req, res, next){

  //ICI METTRE MODULES DE NOTRE Middleware
  req.getData = function(url){
    console.log(url);
  }


  //Merci de laisser le next
  next();
}
