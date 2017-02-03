module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
    
    app.use(function (req, res, next){
		response.sendFile('./app_carrez/404.html');
	});
}