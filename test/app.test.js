import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

test('app exports express instance', () => {
  assert.ok(app, 'app should be defined');
  assert.equal(typeof app.use, 'function');
  assert.equal(typeof app.get, 'function');
});
