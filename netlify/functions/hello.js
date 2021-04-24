const { API_URL, API_KEY } = process.env;

exports.handler = async function(event, context) {
  return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello',
        test: `test is "${API_URL}"`,
        params: event.queryStringParameters,
      })
  };
}
