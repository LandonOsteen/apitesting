const readline = require('readline');
const { fieldDuplicationTest } = require('./fieldDuplicationTest'); // Assuming this is the right path
// Import other tests similarly

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tests = {
  '1': {
    name: 'Field Duplication Test',
    function: fieldDuplicationTest
  },
  // Add other tests with their respective keys
};

function runSelectedTest(testKey, apiUrl) {
  if (tests[testKey]) {
    console.log(`Running ${tests[testKey].name}`);
    tests[testKey].function(apiUrl);
  } else {
    console.log('Invalid selection.');
  }
}

function listTestsAndRunSelection() {
  console.log('Available Tests:');
  Object.keys(tests).forEach(key => {
    console.log(`${key}: ${tests[key].name}`);
  });

  rl.question('Enter the number of the test to run: ', (testKey) => {
    rl.question('Enter your GraphQL API URL: ', (apiUrl) => {
      runSelectedTest(testKey, apiUrl);
      rl.close();
    });
  });
}

listTestsAndRunSelection();
