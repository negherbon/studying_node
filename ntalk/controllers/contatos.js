module.exports = function(app) {
	var ContatoController = {
		index: function(req, res){
			var usuario = req.session.usuario;
			var params = {
				usuario: usuario,
				contatos: usuario.contatos
			};
			res.render('contatos/index', params);
		},
		create: function(req, res){
			var contato = req.body.contato;
			var usuario = req.session.usuario;
			usuario.contatos.push(contato);
			res.redirect('/contatos');
		},
		show: function(req, res){
			var id = req.params.id;
			var contato = req.session.usuario.contatos[id];
			var params = { contato: contato, id: id };
			res.redirect('/contatos/show', params);
		},
		edit: function(req, res){
			var id = req.params.id;
			var contato = req.session.usuario.contatos[id];
			var params = {contato: contato, id: id};
			res.redirect('/contato/edit', params);
		},
		update: function(req, res){
			var id = req.params.id;
			var contato = req.body.contato;
			req.session.usuario.contatos[id] = contato;
			res.redirect('/contatos');
		},
		destroy: function(req, res){
			var id = req.params.id;
			req.session.usuario.contatos.splice(id, 1);
			res.redirect('/contatos');
		}
	};

	return ContatoController; 
}