const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendGraphQLQuery(options, query, callback) {
  const data = JSON.stringify({ query });

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      callback(null, JSON.parse(responseData));
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.write(data);
  req.end();
}

function fieldDuplicationTest(apiUrl) {
  const url = new URL(apiUrl);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  // The GraphQL query with duplicated fields
  const duplicatedFieldsQuery = `
    query {
      user(id: "1") {
        name
        name
        email
        email
      }
    }
  `;

  sendGraphQLQuery(options, duplicatedFieldsQuery, (error, response) => {
    if (error) {
      console.error('Request failed:', error);
      return;
    }

    // Validate the response
    if (response.data && response.data.user) {
      console.log('Field duplication test passed.');
    } else {
      console.error('Field duplication test failed.');
    }
  });
}

rl.question('Enter your GraphQL API URL: ', (apiUrl) => {
  fieldDuplicationTest(apiUrl);
  rl.close();
});
