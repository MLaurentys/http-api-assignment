const http = require('http');
const url = require('url');

const textHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlers = {
  GET: {
    '/': textHandler.getIndex,
    '/style.css': textHandler.getStyle,
    '/success': textHandler.success,
    '/badRequest': textHandler.badRequest,
    '/unauthorized': textHandler.unauthorized,
    '/forbidden': textHandler.forbidden,
    '/internal': textHandler.internal,
    '/notImplemented': textHandler.notImplemented,
  },
};

function onRequest(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  if (handlers[req.method] && handlers[req.method][reqPath]) {
    handlers[req.method][reqPath](req, res);
  } else {
    textHandler.notFound(req, res);
  }
}

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
