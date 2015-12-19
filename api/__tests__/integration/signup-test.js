import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

describe('User Signup', () => {
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
      done();
    }).catch((error) => {
      console.log('Error setting up models for tests', error);
      done(error);
    });
  });

  afterEach(() => {
    return Bluebird.all([
      models.User.sync({ force: true })
    ]);
  });

  it('health check works', (done) => {
    request(app)
    .get('/health')
    .expect(200, {healthy: true}, done);
  });

  it('creates user on signup', (done) => {
    request(app)
    .post('/signup')
    .send({ username: 'johndoe', password: 'test', email: 'test@example.com'})
    .expect(201, {status: 201, success: true, user: 'johndoe'}, done);
  });

  it('sets the cookie when creating a user', (done) => {
    request.agent(app)
    .post('/signup')
    .send({ username: 'janedoe', password: 'test', email: 'jane@example.com'})
    .end((err, res) => {
      expect(err).to.not.be.ok;
      expect(res.status).to.equal(201);
      expect(res.headers['set-cookie']).to.exist;
      done();
    });
  });

  it('returns an error with bad user email', (done) => {
    request(app)
    .post('/signup')
    .send({ username: 'test', password: 'test', email: 'notanemail'})
    .expect(400, {status: 400, success: false, error: 'Validation Error: Invalid Email'}, done);
  });

  it('returns an error with bad username', (done) => {
    request(app)
    .post('/signup')
    .send({ username: 'err', password: 'test', email: 'test@example.com'})
    .expect(400, {status: 400, success: false, error: 'Validation Error: Invalid Username'}, done);
  });

  it('returns an error with bad user password', (done) => {
    request(app)
    .post('/signup')
    .send({ username: 'test', password: 'err', email: 'test@example.com'})
    .expect(400, {status: 400, success: false, error: 'Validation Error: Invalid Password'}, done);
  });
});
