let http = require('http')
let fs = require('fs')

var server = http.createServer()

server.on('request', (request, response) =>{
	
	fs.readFile('test.html', (err,data) => {
		
		if(err) throw err

		response.writeHead(200,{
		'Content-type':'text/html; charset=utf-8'
		})

		response.end(data)
	})

	
})

server.listen(8080)
console.log("Serveur lancé")