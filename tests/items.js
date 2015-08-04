var app = require('./../app.js');

// connect to the local database (this won't need to run in production)
var db = require('monk')('localhost/items')
var items = db.get('items');
require('dotenv').load()


// We're using the built in assert module for our tests.
// https://nodejs.org/api/assert.html
var assert = require('assert');

// And supertest to run our app and send it requests.
var request = require('supertest');

before(function(done) {
  items.remove({}, function() {
    items.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
      done()
    });
  });
});

describe('POST api/items', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/items')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});
