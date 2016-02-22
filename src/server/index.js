require('babel-register')({
        "presets": ["es2015"]
});
const incDom = require('incremental-dom');
const redux = require('redux');
const fs = require('fs');
const Path = require('path');
const Hapi = require('hapi');
const DB = require('./database');
const Routes = require('./routes');

const MODE = process.env.NODE_ENV || 'dev';
const server = new Hapi.Server();

server.connection({ port: MODE === 'dev' ? 3000 : 80 });
const io = require('socket.io')(server.listener);
io.on('connection', function (socket) {

    socket.emit('Oh hii!');

    socket.on('burp', function () {
        socket.emit('Excuse you!');
    });
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    server.route(Routes.endpoints);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
          fs.readFile(`${__dirname}/../index.html`, 'utf8', (err, data) => {
            if (err) throw err;
            reply(data);
          });
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'dist'
            }
        }
    });

    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
