import request from 'supertest';
import nock from 'nock';

import app from '../src/app';

import { BASE_URL } from '../src/services/todos';

const TODO_MOCK = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
};

describe('todos', () => {
  describe('/todos GET', () => {
    nock(BASE_URL).get('/todos', [TODO_MOCK]);
    test('should return all todos', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos')
        .then((res: request.Response) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toBeInstanceOf(Object);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('userId');
          expect(res.body[0]).toHaveProperty('title');
          expect(res.body[0]).toHaveProperty('completed');
          expect(res.body[0].id).toBe(TODO_MOCK.id);
          expect(res.body[0].userId).toBe(TODO_MOCK.userId);
          expect(res.body[0].title).toBe(TODO_MOCK.title);
          expect(res.body[0].completed).toBe(TODO_MOCK.completed);
          done();
        });
    });
  });
});
