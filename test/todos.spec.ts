const mockedResponse = [{ name: 'a' }];
jest.doMock('request-promise', () => () => Promise.resolve(mockedResponse));

import request from 'supertest';
import app from '../app';

describe('todos', () => {
  describe('/todos GET', () => {
    it('should return all todos', done => {
      request(app)
        .get('/todos')
        .expect(200)
        .then(res => {
          expect(res.body).toStrictEqual(mockedResponse);
          done();
        });
    });
  });
});
