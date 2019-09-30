/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', done => {
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', () => {
    suite('POST /api/books with title => create book object/expect book object', () => {
      test('Test POST /api/books with title', done => {
        chai.request(server)
        .post('/api/books')
        .send({ title: 'Some title 4' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.comments, 'Book should contain comments');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.property(res.body, '_id', 'Book should contain _id');
          done();
        });
      });
      
      test('Test POST /api/books with no title given', done => {
        chai.request(server)
        .post('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.text, 'title property missing');
          done();
        });
      });
    });

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books',  done => {
       chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
        });
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db',  done => {
       chai.request(server)
        .get('/api/books/5d9219f033168c0f0f0fd38a')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  done => {
       chai.request(server)
        .get('/api/books/5d9219f033168c0f0f0fd38c')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body.comments, 'Book should contain comments');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.property(res.body, '_id', 'Book should contain _id');
          done();
        });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      test('Test POST /api/books/[id] with comment', done => {
        chai.request(server)
        .post('/api/books/5d9219f033168c0f0f0fd38c')
        .send({ comment: 'Great book, would read again.' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.comments, 'Book should contain comments');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.property(res.body, '_id', 'Book should contain _id');
          done();
        });
      });
    });
  });
});
