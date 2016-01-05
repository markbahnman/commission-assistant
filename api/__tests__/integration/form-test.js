import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
var templateid;
var inputs = [];

describe('FormTemplateInputType', () => {
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
            })
      ],(err,results) => done(err));
    });

    afterEach(() => {
      return Bluebird.all([
        models.FormTemplate.sync({ force: true })
      ]);
    });

    it('should allow a user to create a form', (done) => {
      agent
        .post('/createForm')
        .send({templateid: templateid, inputs: inputs})
        .expect(201)
        .end((err, res) => {
          expect(res.body.result).to.have.length(1);
          expect(res.body.result[0]).to.have.length(1);
          expect(res.body.result[0][0]).to.have.keys(
            ['FormTemplateId', 'FormInputTypeId', 'createdAt', 'updatedAt']
          );
          done();
        });
    });
  });
});
