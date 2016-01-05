import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
describe('FormTemplate', () => {
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
        models.FormTemplate.sync({ force: true })
      ]);
    });

    it('should not allow a user to create a form template with no title', (done) => {
      const template = {
        text: 'Invalid'
      };

      agent
      .post('/formTemplate')
      .expect(400, done);
    });

    it('should allow a user to create a form template', (done) => {
      const template = {
        title: 'Test Template'
      };

      agent
        .post('/formTemplate')
        .send(template)
        .expect(201)
        .end((err, res) => {
          const templateResult = res.body.template;
          expect(res.body.success).to.be.true;
          expect(templateResult).to.have.keys(['id', 'template_title', 'UserId', 'updatedAt', 'createdAt']);
          expect(templateResult.template_title).to.equal(template.title);
          done();
        });
    });
  });
});
