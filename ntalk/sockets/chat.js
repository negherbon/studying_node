module.exports = function(io){
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    var sockets = io.sockets;
    var room;
    sockets.on('connection', function(socket){
        var session = socket.handshake.session;
        var user = session.usuario;

        socket.on('join', function(room) {
            if(!room) {
                var timestamp = new Date().toString();
                var md5 = crypto.createHash('md5');
                room = md5.update(timestamp).digest('hex');
            }
            socket.set('room', room);
            socket.join(room);
        });

        socket.on('disconnect', function () {
            socket.get('room', function(erro, room) {
                socket.leave(room);
            });
        });

        socket.on('send-server', function (msg) {
            var msg = "<b>"+ user.nome +":</b> "+ msg +"<br>";
            socket.get('room', function(erro, room) {
                var data = {email: user.email, room: room};
                socket.broadcast.emit('new-message', data);
                sockets.in(room).emit('send-client', msg);
            });
        });
    });
}