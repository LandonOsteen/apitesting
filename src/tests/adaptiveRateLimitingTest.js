const http = require('http');
const { performance } = require('perf_hooks');

function makeRequest(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve(res.statusCode));
    });

    req.on('error', (error) => reject(error));
    req.end();
  });
}

async function adaptiveRateLimitingTest(url, initialRate = 10, increment = 10) {
  let rate = initialRate;
  let rateLimitHit = false;

  while (!rateLimitHit) {
    const requests = Array(rate).fill().map(() => makeRequest(url));
    const start = performance.now();

    try {
      const responses = await Promise.all(requests);
      const end = performance.now();
      console.log(`Sent ${rate} requests in ${(end - start).toFixed(2)} ms`);

      // Check for rate limit exceeded (HTTP 429)
      if (responses.some(code => code === 429)) {
        rateLimitHit = true;
        console.log(`Rate limit exceeded at rate of ${rate} requests.`);
      } else {
        rate += increment;
      }
    } catch (error) {
      console.error('Error occurred:', error.message);
      break;
    }
  }
}

// details for input
const API_URL = 'http://localhost:4000/graphql';
adaptiveRateLimitingTest(API_URL);
