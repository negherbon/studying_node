var http = require('http');
var fs = require('fs');
var url = require('url');

var getDir = function(filename){
	return __dirname + '/' + filename + '.html'; 
};

var getView = function(view, callback){
	fs.readFile(view, function(err, html){
		return html;
	});
}

var server = http.createServer(function(request, response){
	var path_name = url.parse(request.url, true).path;
	var view =  (path_name === '/') ? getDir('artigos') : getDir(path_name);

	if (!fs.existsSync(view)){
		load_view(getDir('erro'));
		return;
	}

	getView(view, function(err, html){
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.end(html);
	});
	
});

server.listen(3000, function(){
	console.log('Executando Site Pessoal');
});
