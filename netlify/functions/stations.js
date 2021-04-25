const { jsonResponse, errorResponse, apiGet } = require('./utils');

exports.handler = async (event) => {
  const { API_URL, API_KEY } = process.env;
  const { httpMethod, queryStringParameters } = event;
  const { name } = queryStringParameters;

  const url = `${API_URL}Stations`;

  if (httpMethod === 'GET') {
    try {
      const body = await apiGet(API_KEY, url, { name });
      return jsonResponse(200, body);
    } catch (err) {
      return errorResponse(err);
    }
  }

  return jsonResponse(405, {
    message: 'Method not allowed'
  });
}
