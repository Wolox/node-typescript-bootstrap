import request from 'supertest';
import models from '../app/models';
import app from '../app';

const User = models.users;

describe('users', () => {
  beforeEach(() => User.bulkCreate([{ username: 'u1' }, { username: 'u2' }]));
  describe('/users GET', () => {
    it('should return all users', done => {
      request(app)
        .get('/users')
        .expect(200)
        .then(res => {
          expect(res.body.length).toBe(2);
          done();
        });
    });
  });

  describe('/users POST', () => {
    it('should create an user', done => {
      request(app)
        .post('/users')
        .send({ username: 'u3' })
        .expect(201)
        .then(async () => {
          const user = await User.findOne({ where: { username: 'u3' } });
          expect(user).not.toBeNull();
          done();
        });
    });
  });

  describe('/users/:id GET', () => {
    it('should return user with id 1', done => {
      request(app)
        .get('/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('username');
          expect(res.body).toHaveProperty('id');
          done();
        });
    });

    it('should return error for user with id 5', done => {
      request(app)
        .get('/users/5')
        .expect(404)
        .then(response => {
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('internal_code');
          done();
        });
    });
  });
});
