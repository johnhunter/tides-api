const { jsonResponse, errorResponse, apiGet } = require('./utils');

exports.handler = async (event) => {
  const { API_URL, API_KEY } = process.env;
  const { httpMethod, queryStringParameters } = event;
  const { stationId, duration } = queryStringParameters;

  if(!stationId) {
    return jsonResponse(400, {
      message: 'You must provide a valid stationId'
    });
  }

  const url = `${API_URL}Stations/${stationId}/TidalEvents`;

  if (httpMethod === 'GET') {
    try {
      const body = await apiGet(API_KEY, url, { duration });
      return jsonResponse(200, body);
    } catch (err) {
      return errorResponse(err);
    }
  }

  return jsonResponse(404);
}

