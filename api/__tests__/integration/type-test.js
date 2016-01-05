import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
describe('Type', () => {
  before((done) => {
    // console.log('syncing test database for type test');
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
        models.Type.sync({ force: true })
      ]);
    });

    it('should not allow a user to create a type with no description', (done) => {
      const type = {
        name: 'Test Type',
        price: '25'
      };

      agent
      .post('/type')
      .expect(400, done);
    });

    it('should not allow a user to create a type with no price', (done) => {
      const type = {
        name: 'Test Type',
        description: 'Test Description'
      };

      agent
      .post('/type')
      .expect(400, done);
    });

    it('should not allow a user to create a type with no name', (done) => {
      const type = {
        price: '25',
        description: 'Test Description'
      };

      agent
      .post('/type')
      .expect(400, done);
    });

    it('should allow a user to create a type', (done) => {
      const type = {
        name: 'Test Type',
        price: '25',
        description: 'Test Description'
      };

      agent
        .post('/type')
        .send(type)
        .expect(201)
        .end((err, res) => {
          const typeResult = res.body.type;
          expect(res.body.success).to.be.true;
          expect(res.body.type).to.have.keys(['id', 'UserId', 'type_description', 'base_price', 'type_name', 'updatedAt', 'createdAt']);
          expect(typeResult.base_price).to.equal(25);
          expect(typeResult.type_name).to.equal(type.name);
          expect(typeResult.UserId).to.exist;
          done();
        });
    });
  });
});
