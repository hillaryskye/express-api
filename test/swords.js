var app = require('./../app.js');

// connect to the local database (this won't need to run in production)
var db = require('monk')('localhost/swords')
var swords = db.get('swords');

// We're using the built in assert module for our tests.
// https://nodejs.org/api/assert.html
var assert = require('assert');

// And supertest to run our app and send it requests.
var request = require('supertest');

before(function(done) {
  swords.remove({}, function() {
    swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
    swords.insert({title: 'Extra Sword', _id: '55c050595ae876b6b79ad317'}, function() {
      done()
      });
    });
  });
});

describe('POST api/swords', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/swords')
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

// using id of swords added above in before
describe('PUT api/swords/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/swords/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

// /api/items/:id
describe('GET api/swords/:id', function () {
  it('gets one item, a resource', function (done) {
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

// DELETE /api/items/:id
describe('POST api/swords/:id/delete', function () {
  it('deletes a resource', function (done) {
    request(app)
      .post('/api/swords/55c050595ae876b6b79ad318/delete')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, undefined)
          done()
        }
      })
  });
});

// GET /api/items/
describe('GET api/swords', function () {
  it('gets all the resources', function (done) {
    request(app)
      .get('/api/swords')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body)
          assert.equal(res.body.length, 2);
          done()
        }
      })
  });
});
