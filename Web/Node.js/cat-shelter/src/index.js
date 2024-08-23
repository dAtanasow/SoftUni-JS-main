const http = require('http');
const { homeHandler } = require('../src/handlers/home');
const { staticFileHandler } = require('./handlers/static');

const routes = {
    '/': homeHandler,
    '/index.html': homeHandler
}

http.createServer((req, res) => { 
    const route = routes[req.url];
    if (typeof route == 'function') {
        route(req, res);
        return;
    } else if (staticFileHandler(req, res)) {
        return;
    }

    res.writeHead(404, {
        'Content-type': 'text/plaint'
    });
    res.write('404 Not Found');
    res.end()
}).listen(3000);