const fetch = require('node-fetch');
const queryString = require('query-string');

const appendUrlQuery = (url, params = {}) => {
  const query = queryString.stringify(params);
  return query ? `${url}?${query}` : url;
};

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

const apiGet = async (apiKey, url, params) => {
  const headers = {
    'Ocp-Apim-Subscription-Key': apiKey
  };

  return await fetch(appendUrlQuery(url, params), {
    method: 'get',
    headers,
  }).then(res => res.json());
};

exports.appendUrlQuery = appendUrlQuery;
exports.jsonResponse = jsonResponse;
exports.apiGet = apiGet;

// 404 if utils module is called as a function
exports.handler = async () => jsonResponse(404);
