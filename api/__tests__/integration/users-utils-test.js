import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';
import userExists from '../../utils/users';
import {expect} from 'chai';

describe('Users Utils', () => {
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

  describe('userExists', () => {
    it('resolves correctly if user exists', (done) => {
      userExists('testing')
      .then((user) => {
        expect(user).to.exist;
        done();
      }, (err) => done(err));
    });

    it('rejects correctly if user does not exist', (done) => {
      userExists('invalid')
      .then((user) => {
        done(new Error('shouldn\'t be successful'));
      }, (err) => {
        expect(err).to.exist;
        expect(err.status).to.eq(403);
        done();
      });
    });
  });
});
