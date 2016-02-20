const incDom = require('incremental-dom');
const redux = require('redux');
const fs = require('fs');
const Path = require('path');
const Hapi = require('hapi');
const DB = require('./database');
const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    server.route(Routes.endpoints);

    server.route({
        method: 'GET',
        path: '/',
        handler:  function (request, reply) {
          fs.readFile(`${__dirname}/../index.html`, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
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
