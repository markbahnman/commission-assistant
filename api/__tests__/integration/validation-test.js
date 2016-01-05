import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';
import validate from '../../actions/validateFormData';

var agent = request.agent(app);
var templateid;
var formid;
var inputs = [];

describe('Server Validation', () => {
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
      done();
    }).catch((error) => {
      console.log('Error setting up models for tests', error);
      done(error);
    });
  });

  describe('Form Validation', () => {

    before((done) => {
      series([
        (cb) =>
          agent
            .post('/signup')
            .send({ username: 'john', password: 'test', email: 'test@example.com' })
            .expect(201, {status: 201, success: true, user: 'john'})
            .end((err, res) => cb(err, res)),
        (cb) =>
          agent
            .post('/formTemplate')
            .send({title: 'Test Template'})
            .expect(201)
            .end((err, res) => {
              templateid = res.body.template.id;
              cb(err, res);
            }),
        (cb) =>
          agent
            .post('/inputType')
            .send({label:'Customer Name', text: 'Name', type: 'text', required: true})
            .expect(201)
            .end((err, res) => {
              inputs.push(res.body.inputType.id);
              cb(err, res);
            }),
        (cb) =>
          agent
            .post('/inputType')
            .send({label:'Customer Email', text: 'Email', type: 'email', required: true})
            .expect(201)
            .end((err, res) => {
              inputs.push(res.body.inputType.id);
              cb(err, res);
            }),
        (cb) =>
          agent
            .post('/createForm')
            .send({templateid: templateid, inputs: inputs})
            .expect(201)
            .end((err, res) => {
              cb(err, res);
            })
      ], (err, results) => done(err));
    });

    it('should not validate with invalid templateid', (done) => {
      validate(666, {name: 'john', email: 'test@example.com'})
      .then((result) => {
        done(new Error('Should not be valid: missing inputs'));
      }).catch((err) => {
        expect(err.error).to.exist;
        done();
      });
    });

    it('should not validate with missing inputs and valid data', (done) => {
      validate(templateid, {name: 'john'})
      .then((result) => {
        done(new Error('Should not be valid: missing inputs'));
      }).catch((err) => {
        expect(err.error).to.exist;
        expect(err.keys).to.exist;
        expect(err.keys).to.have.length(2);
        done()
      });
    });

    it('should not validate with invalid email input', (done) => {
      validate(templateid, {name: 'john', email: 'testexample.com'})
      .then((result) => {
        done(new Error('Should not be valid: missing inputs'));
      }).catch((err) => {
        expect(err.error).to.exist;
        expect(err.keys).to.have.length(1);
        expect(err.keys[0].key).to.equal('email');
        expect(err.keys[0].reason).to.equal('must be email');
        done();
      });
    });

    it('should validate with correct number of inputs and valid data', (done) => {
      validate(templateid, {name: 'john', email: 'test@example.com'})
      .then((result) => {
        expect(result).to.exist;
        expect(result.success).to.be.true;
        done();
      }).catch((err) => done(err.error));
    });
  });
});
