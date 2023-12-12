// basic rate limiting test with colored responses

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

async function rateLimitingTest(url, targetRate) {
  const startTime = performance.now();
  const requests = [];

  for (let i = 0; i < targetRate; i++) {
    requests.push(makeRequest(url));
  }

  try {
    const responses = await Promise.all(requests);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(`Test completed in ${timeTaken.toFixed(2)} ms`);

    // Check if any responses indicate rate limiting (e.g., HTTP 429)
    const rateLimited = responses.some(code => code === 429);
    if (rateLimited) {
      console.log('Rate limit exceeded (HTTP 429 detected). Test passed.');
    } else {
      console.log('No rate limiting detected. Test failed.');
    }
  } catch (error) {
    console.log('Test failed due to an error:', error.message);
  }
}

// Test Parameters
const API_URL = 'http://localhost:4000/graphql'; // API URL
const TARGET_RATE = 100; // Number of requests to send
rateLimitingTest(API_URL, TARGET_RATE);
