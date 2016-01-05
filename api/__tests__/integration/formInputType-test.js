import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
describe('FormInputType', () => {
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

    it('should not allow a user to create a type with no label', (done) => {
      const type = {
        text: 'Label'
      };

      agent
      .post('/inputType')
      .expect(400, done);
    });

    it('should not allow a user to create a type with no text', (done) => {
      const type = {
        label: 'Test Label'
      };

      agent
      .post('/inputType')
      .expect(400, done);
    });

    it('should allow a user to create a formInputType', (done) => {
      const type = {
        label: 'Test Label',
        text: 'Label',
        required: false,
        type: 'email'
      };

      agent
        .post('/inputType')
        .send(type)
        .expect(201)
        .end((err, res) => {
          const typeResult = res.body.inputType;
          expect(res.body.success).to.be.true;
          expect(res.body.inputType).to.have.keys(['id', 'input_label', 'input_text', 'required', 'input_type', 'updatedAt', 'createdAt']);
          expect(typeResult.input_label).to.equal(type.label);
          expect(typeResult.input_text).to.equal(type.text.toLowerCase());
          expect(typeResult.input_type).to.equal(type.type);
          expect(typeResult.required).to.equal(type.required);
          done();
        });
    });

    it('should create a input type with required true when required is left out of post body', (done) => {
      const type = {
        label: 'Test Label',
        text: 'Label',
        type: 'email'
      };

      agent
      .post('/inputType')
      .send(type)
      .expect(201)
      .end((err, res) => {
        const typeResult = res.body.inputType;
        expect(res.body.success).to.be.true;
        expect(res.body.inputType).to.have.keys(['id', 'input_label', 'input_text', 'required', 'input_type', 'updatedAt', 'createdAt']);
        expect(typeResult.input_label).to.equal(type.label);
        expect(typeResult.input_text).to.equal(type.text.toLowerCase());
        expect(typeResult.input_type).to.equal(type.type);
        expect(typeResult.required).to.be.true;
        done();
      });
    });
  });
});
