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
    var openingID;

    before((done) => {
      agent
      .post('/signup')
      .send({ username: 'john', password: 'test', email: 'test@example.com' })
      .end(() => {
        agent
        .post('/openings')
        .send({ title: 'Test Title', price: '1.05' })
        .end((err, res) => {
          openingID = res.body.opening.id;
          done();
        })
      });
    });

    afterEach(() => {
      return Bluebird.all([
        models.Option.sync({ force: true })
      ]);
    });

    it('should allow a user to create an option for an existing opening', (done) => {
      const option = {
        title: 'Color',
        price: '1.05',
        description: 'Added color',
        openingid: openingID
      };

      agent
        .post('/options')
        .send(option)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
