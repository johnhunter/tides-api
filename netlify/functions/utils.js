const fetch = require('node-fetch');
const queryString = require('query-string');

const jsonResponse = (statusCode, body) => {
  const headers = {
    'content-type': 'application/json'
  };
  return {
    statusCode,
    headers,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
  };
};

const errorResponse = err => {
  const [statusCode, statusText] = err.message.split(':');
  return jsonResponse(statusCode, {
    message: statusText
  });
};

const handleError = res => {
  if (!res.ok) {
    // Error must be string
    throw Error(`${res.status}:${res.statusText}`);
  }
  return res;
};

const apiGet = (apiKey, url, params) => {
  if(!apiKey) {
    throw Error('500:Application is missing configuration');
  }

  const options = {
    method: 'get',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey
    },
  };

  return fetch(queryString.stringifyUrl({ url, query: params }), options)
    .then(handleError)
    .then(res => res.json());
};

exports.jsonResponse = jsonResponse;
exports.errorResponse = errorResponse;
exports.apiGet = apiGet;

// 404 if utils module is called as a function
exports.handler = async () => jsonResponse(404);
