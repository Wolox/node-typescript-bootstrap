const mockedResponse = [{ name: 'a' }];

jest.doMock('request-promise', () => (): Promise<object> => Promise.resolve(mockedResponse));

import request from 'supertest';
import app from '../app';

describe('todos', () => {
  describe('/todos GET', () => {
    it('should return all todos', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos')
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual(mockedResponse);
          done();
        });
    });
  });
});
