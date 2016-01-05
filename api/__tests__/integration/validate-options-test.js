import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';
import validate from '../../actions/validateOptions';

var agent = request.agent(app);
var options = [];

describe('Validating Options', () => {
  before((done) => {
    series([
      (cb) =>
        models.sequelize.sync({force: true}).then(() => cb()).catch((error) => {
          cb(error);
        }),
      (cb) =>
        agent
          .post('/signup')
          .send({ username: 'john', password: 'test', email: 'test@example.com' })
          .expect(201, {status: 201, success: true, user: 'john'})
          .end((err, res) => cb(err, res)),
      (cb) =>
        agent
          .post('/option')
          .send({title: 'First', description: 'First Option', price: '25.00'})
          .expect(201)
          .end((err, res) => {
            options.push(res.body.option.id);
            cb(err, res);
          }),
      (cb) =>
        agent
          .post('/option')
          .send({title: 'Second', description: 'Second Option', price: '26.00'})
          .expect(201)
          .end((err, res) => {
            options.push(res.body.option.id);
            cb(err, res);
          })
    ], (err, results) => done(err));
  });

  afterEach(() => {
    return Bluebird.all([
      models.Quote.sync({ force: true })
    ]);
  });

  /*
   * Get the formid, object with keys as inputtype id's and values as answers
   * set artistid to the userid of the form, customerid as ther session user,
   * to toacceptid as the artist id. Set payment_status to pending.
   */
  it('should validate with the correct option ids', (done) => {
    validate(options)
    .then((result) => {
      expect(result.success).to.be.true;
      done();
    }).catch((err) => {
      console.log(err);
      done(err.error)
    });
  });

  it('should not validate with an incorrect id', (done) => {
    validate(options.concat(666))
    .then((result) => {
      done(new Error('Should not be successful'));
    }).catch((err) => {
      expect(err.error).to.exist;
      expect(err.success).to.be.false;
      expect(err.found).to.equal(2);
      done();
    });
  });

  it('should return an error correctly with null input', (done) => {
    validate()
    .then(() => {
      done(new Error('Should not be successful'));
    }).catch((err) => {
      expect(err.error).to.exist;
      expect(err.success).to.be.false;
      done();
    });
  });

  it('should validate with an empty array of options', (done) => {
    validate([])
    .then((result) => {
      expect(result.success).to.be.true;
      done();
    }).catch((err) => {
      done(err.error);
    });
  });
});
