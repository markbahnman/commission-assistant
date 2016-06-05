import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);

describe('Option', () => {
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
        .expect(201, {status: 201, success: true, user: 'john'}, cb)
    ], (err, results) => done(err));
  });

  afterEach(() => {
    return Bluebird.all([
      models.Option.sync({ force: true })
    ]);
  });

  describe('Creating', () => {

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
      .end((err, res) => done(err));
    });

  });

  describe('Updating', () => {
    let optionid;
    beforeEach((done) => {
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
        optionid = res.body.option.id;
        done(err);
      });
    });

    it('should update the option with valid data', (done) => {
      const updatedOption = { price: 99 };

      agent.put(`/option/${optionid}`)
      .send(updatedOption)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.deep.property('result.price');
        done(err);
      });
    });

    it('should reject an update with no data', (done) => {
      agent.put(`/option/${optionid}`)
      .send({})
      .expect(400, done)
    });
  });
});
