const mockedResponse = [{ name: 'a' }];
jest.doMock('request-promise', () => () => Promise.resolve(mockedResponse));

const request = require('supertest'),
  dictum = require('dictum.js'),
  app = require('../app');

describe('todos', () => {
  describe('/todos GET', () => {
    it('should return all todos', done => {
      request(app)
        .get('/todos')
        .expect(200)
        .then(res => {
          expect(res.body).toStrictEqual(mockedResponse);
          dictum.chai(res);
          done();
        });
    });
  });
});
