const http = require('http');
const { homeHandler } = require('./handlers/home');
const { staticFileHandler } = require('./handlers/static');
const { addBreadHandler, postBreedHandler } = require('./handlers/addBread');
const { addCatHandler } = require('./handlers/addCat');

const routes = {
    "GET": {
        '/': homeHandler,
        '/index.html': homeHandler,
        '/cats/add-breed': addBreadHandler,
        '/cats/add-cat': addCatHandler 
    },
    "POST": {
        '/cats/add-breed': postBreedHandler
    }
};

http.createServer((req, res) => {
    const method = routes[req.method];
    if (method) {
        const route = method[req.url];
        if (typeof route == 'function') {
            route(req, res);
            return;
        }
    } else if (staticFileHandler(req, res)) {
        return;
    }

    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.write('404 Not Found');
    res.end()
}).listen(3000);