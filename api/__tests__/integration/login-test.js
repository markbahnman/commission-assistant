import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';
import {expect} from 'chai';

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
      models.User.sync({force: true})
    ]);
  });

  it('logs in a user with correct details', (done) => {
    request(app)
      .post('/login')
      .send({username: 'testing', password: 'test'})
      .expect(200, {status: 200, success: true, user: 'testing'}, done);
  });

  it('fails to log in a user with incorrect details', (done) => {
    request(app)
      .post('/login')
      .send({username: 'testing', password: 'wrongpassword'})
      .expect(401, {status: 401, success: false, error: 'Invalid Password'}, done);
  });

  it('logs in with a cookie', (done) => {
    request.agent(app)
      .post('/login')
      .send({username: 'testing', password: 'test'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        done();
      });
  });
});
