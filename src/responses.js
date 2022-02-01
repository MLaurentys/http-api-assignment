const fs = require('fs');
const url = require('url');

const { respond, mediaRespond } = require('./adapters.js');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCss = fs.readFileSync(`${__dirname}/../client/style.css`);

const responses = {
  success: { message: 'This is a successful response' },
  badRequest: {
    valid: {
      message: 'This request had the required parameters',
    },
    invalid: {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    },
  },
  unauthorized: {
    valid: {
      message: 'You have successfully viewed the content.',
    },
    invalid: {
      message: 'Missing loggedIn query parameter se to yes',
      id: 'unauthorized',
    },
  },
  forbiden: {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  },
  internal: {
    message: 'Internal server error. Something went wrong.',
    id: 'internalError',
  },
  notImplemented: {
    message:
      'A get request for this page has not been implemented yet.'
      + ' Check again later for updated content.',
    id: 'notImplemented',
  },

  notFound: {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  },
};

function getIndex(req, res) {
  mediaRespond(res, index, 'text', 'html');
}

const getStyle = (req, res) => {
  mediaRespond(res, styleCss, 'text', 'css');
};

function success(req, res) {
  respond(res, responses.success, req.headers.accept);
}

function badRequest(req, res) {
  const { query } = url.parse(req.url, true);
  if (query.valid === 'true') respond(res, responses.badRequest.valid, req.headers.accept);
  else respond(res, responses.badRequest.invalid, req.headers.accept, 400);
}

function unauthorized(req, res) {
  const { query } = url.parse(req.url, true);
  if (query.loggedIn === 'yes') respond(res, responses.unauthorized.valid, req.headers.accept);
  else respond(res, responses.unauthorized.invalid, req.headers.accept, 401);
}

function forbidden(req, res) {
  respond(res, responses.forbiden, req.headers.accept, 403);
}

function internal(req, res) {
  respond(res, responses.internal, req.headers.accept, 500);
}

function notImplemented(req, res) {
  respond(res, responses.notImplemented, req.headers.accept, 501);
}

function notFound(req, res) {
  respond(res, responses.notFound, req.headers.accept, 404);
}

module.exports = {
  getIndex,
  getStyle,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
