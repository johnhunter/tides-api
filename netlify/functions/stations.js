const { jsonResponse, apiGet } = require('./utils');

exports.handler = async (event) => {
  const { API_URL, API_KEY } = process.env;
  const { httpMethod, queryStringParameters } = event;
  const { name } = queryStringParameters;

  if (!API_URL || !API_KEY) {
    return jsonResponse(500, {
      message: 'Application is missing configuration'
    });
  }

  const url = `${API_URL}Stations`;

  if (httpMethod === 'GET') {
    try {
      const body = await apiGet(API_KEY, url, { name });
      return jsonResponse(200, body);
    } catch (e) {
      jsonResponse(500, {
        message: 'Failed to fetch data'
      });
    }
  }

  return jsonResponse(404);
}
