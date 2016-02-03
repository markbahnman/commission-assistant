import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
describe('Type', () => {
  before((done) => {
    series([
      (cb) =>
        models.sequelize.sync({force: true})
        .then(() => cb())
        .catch((error) => cb(error)),
      (cb) =>
        agent
        .post('/signup')
        .send({ username: 'john', password: 'test', email: 'test@example.com' })
        .end((err, res) => cb(err, res))
      ], (err, results) => done(err));
  });

  describe('Creating', () => {
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

  describe('Loading', () => {
    it('should get all types for a logged in user', (done) => {
      const type = {
        name: 'Test Type',
        price: '25',
        description: 'Test Description'
      };

      series([
        (cb) =>
        agent.post('/type').send(type).end((err, res) => cb(err, res)),
        (cb) =>
        agent.get('/type').end((err, res) => cb(err, res))
      ], (err, results) => done(err));
    });
  });
});
