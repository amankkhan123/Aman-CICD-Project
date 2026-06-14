const assert = require('assert');

// Simple smoke tests for the aman-cicd-app build pipeline
function add(a, b) {
  return a + b;
}

function buildMessage(name) {
  return `Aman Khan - CI/CD Pipeline (${name})`;
}

assert.strictEqual(add(2, 3), 5, 'add() should return the sum');
assert.ok(buildMessage('test').includes('Aman Khan'), 'message should include author');

console.log('All tests passed for aman-cicd-app');
process.exit(0);
