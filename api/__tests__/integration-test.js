import app from '../api';
import Bluebird from 'bluebird';
import {expect} from 'chai';
import request from 'supertest';
import models from '../models';

describe('User Creation', function () {
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
      done();
    }).catch((error) => {
      console.log("Error setting up models for tests",error);
      done(error);
    });
  });

  beforeEach(() => {
    this.models = require('../models');

    return Bluebird.all([
      this.models.User.destroy({ truncate: true })
    ]);
  });

  it('health check works', (done) => {
    request(app)
      .get('/health')
      .expect(200,{healthy: true}, done)
  });

  it('creates user on signup', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'johndoe', password: 'test', email: 'test@example.com'})
      .expect(200, {success: true}, done);
  });

  it('returns an error with bad user email', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'test', password: 'test', email: 'notanemail'})
      .expect(400,{status: 400, success: false, error: 'Validation Error: Invalid Email'}, done);
  });

  it('returns an error with bad username', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'err', password: 'test', email: 'test@example.com'})
      .expect(400,{status: 400, success: false, error: 'Validation Error: Invalid Username'}, done);
  });

  it('returns an error with bad user password', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'test', password: 'err', email: 'test@example.com'})
      .expect(400,{status: 400, success: false, error: 'Validation Error: Invalid Password'}, done);
  });

});
