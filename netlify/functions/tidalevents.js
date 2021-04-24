const { jsonResponse, apiGet } = require('./utils');

exports.handler = async (event) => {
  const { API_URL, API_KEY } = process.env;
  const { httpMethod, queryStringParameters } = event;
  const { stationId, duration } = queryStringParameters;

  if (!API_URL || !API_KEY) {
    return jsonResponse(500, {
      message: 'Application is missing configuration'
    });
  }

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
    } catch (e) {
      jsonResponse(500, {
        message: 'Failed to fetch data'
      });
    }
  }

  return jsonResponse(404);
}

