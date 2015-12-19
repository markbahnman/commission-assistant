import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
describe('Opening', () => {
  before((done) => {
    console.log('syncing test database for opening test');
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
        models.Opening.sync({ force: true })
      ]);
    });

    it('should allow a user to create an opening', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05'
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(201)
        .end((err, res) => {
          const openingResult = res.body.opening;
          expect(res.body.success).to.be.true;
          expect(res.body.opening).to.have.keys(['id', 'UserId', 'author', 'description', 'price', 'title', 'updatedAt', 'createdAt']);
          expect(openingResult.price).to.equal(1.05);
          expect(openingResult.title).to.equal(opening.title);
          expect(openingResult.author).to.equal('john');
          expect(openingResult.UserId).to.equal(1);
          done();
        });
    });
  });
});
