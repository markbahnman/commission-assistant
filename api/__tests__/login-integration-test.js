import app from '../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../models';

describe('User Login', () => {
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
      done();
    }).catch((error) => {
      console.log('Error setting up models for tests', error);
      done(error);
    });
  });

  beforeEach(() => {
    return Bluebird.all([
    request(app)
      .post('/signup')
      .send({ username: 'testing', password: 'test', email: 'test@example.com'})
    ]);
  });

  afterEach(() => {
    return Bluebird.all([
      models.User.destroy({ truncate: true })
    ]);
  });

  it('logs in a user with correct details', (done) => {
    request(app)
      .post('/login')
      .send({username: 'testing', password: 'test'})
      .expect(200, {status: 200, success: true}, done);
  });

  it('fails to log in a user with incorrect details', (done) => {
    request(app)
      .post('/login')
      .send({username: 'testing', password: 'wrongpassword'})
      .expect(401, {status: 401, success: false, error: 'Invalid Password'}, done);
  });
});
