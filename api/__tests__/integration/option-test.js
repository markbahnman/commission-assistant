import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);

describe('Option', () => {
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
      done();
    }).catch((error) => {
      console.log('Error setting up models for tests', error);
      done(error);
    });
  });

  describe('Creating', () => {

    before((done) => {
      agent
      .post('/signup')
      .send({ username: 'john', password: 'test', email: 'test@example.com' })
      .expect(201, {status: 201, success: true, user: 'john'}, done);
    });

    afterEach(() => {
      return Bluebird.all([
        models.FormInputType.sync({ force: true })
      ]);
    });

    it('should not allow a user to create an option with no title', (done) => {
      const option = {
        price: '25.00',
        description: 'Tip'
      };

      agent
      .post('/option')
      .expect(400, done);
    });

    it('should not allow a user to create an option with no description', (done) => {
      const option = {
        title: 'Tip',
        price: '25.00'
      };

      agent
      .post('/option')
      .expect(400, done);
    });

    it('should not allow a user to create an option with no price', (done) => {
      const option = {
        title: 'Tip',
        description: 'Tip'
      };

      agent
      .post('/option')
      .expect(400, done);
    });

    it('should allow a user to create an option', (done) => {
      const option = {
        title: 'Tip',
        price: '25.00',
        description: 'Tip'
      };

      agent
      .post('/option')
      .send(option)
      .expect(201)
      .end((err, res) => {
        // console.log(res.body);
        done(err);
      });
    });

  });
});
