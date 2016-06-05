import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';

var agent = request.agent(app);
var templateid;
var inputs = [];
var options = [];
var typeid;

describe('Opening', () => {
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
            }),
        (cb) =>
          agent
            .post('/createForm')
            .send({templateid: templateid, inputs: inputs})
            .expect(201)
            .end((err, res) => {
              cb(err, res);
            }),
        (cb) =>
          agent
            .post('/type')
            .send({name: 'Test Type', price: '25', description: 'Test Description'})
            .expect(201)
            .end((err, res) => {
              typeid = res.body.type.id;
              cb(err, res);
            }),
        (cb) =>
          agent
          .post('/option')
          .send({title: 'First', description: 'First Option', price: '1.00'})
          .end((err, res) => {
            options.push(res.body.option.id);
            cb(err, res);
          })
      ], (err, results) => done(err));
    });

    afterEach(() => {
      return Bluebird.all([
        models.Opening.sync({ force: true })
      ]);
    });

    it('should not allow a user to create an opening without a price', (done) => {
      const opening = {
        title: 'Test Title',
        typeid: typeid,
        options: [],
        templateid: templateid
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should not allow a user to create an opening without a typeid', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05',
        options: [],
        templateid: templateid
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should not allow a user to create an opening without a templateid', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05',
        options: [],
        typeid: typeid
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should not allow a user to create an opening without a title', (done) => {
      const opening = {
        price: '1.05',
        typeid: typeid,
        templateid: templateid,
        options: []
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should not allow a user to create an opening with an invalid typeid', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05',
        typeid: 666,
        templateid: templateid,
        options: []
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should not allow a user to create an opening with an invalid templateid', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05',
        typeid: typeid,
        templateid: 666,
        options: []
      };

      agent
        .post('/openings')
        .send(opening)
        .expect(400, done);
    });

    it('should allow a user to create an opening with no options', (done) => {
      const opening = {
        title: 'Test Title',
        price: '1.05',
        typeid: typeid,
        templateid: templateid,
        options: []
      };

      agent
        .post('/openings')
        .send(opening)
        .end((err, res) => {
          const openingResult = res.body.opening;
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(openingResult).to.have.keys(['id', 'FormTemplateId', 'TypeId', 'slots', 'options', 'UserId', 'description', 'price', 'title', 'updatedAt', 'createdAt']);
          expect(openingResult.price).to.equal(1.05);
          expect(openingResult.title).to.equal(opening.title);
          expect(openingResult.slots).to.equal(0);
          expect(openingResult.UserId).to.equal(1);
          expect(openingResult.TypeId).to.equal(typeid);
          expect(openingResult.options).to.have.length(0);
          expect(openingResult.FormTemplateId).to.equal(templateid);
          done();
        });
    });

    it('should allow a user to create an opening with options', (done) => {
      const opening = {
        title: 'Test Title',
        price: '2.00',
        typeid: typeid,
        templateid: templateid,
        options: options,
        slots: 5
      };

      agent
      .post('/openings')
      .send(opening)
      .end((err, res) => {
        const openingResult = res.body.opening;
        expect(res.status).to.equal(201);
        expect(res.body.success).to.be.true;
        expect(openingResult).to.have.keys(['id', 'FormTemplateId', 'TypeId', 'slots', 'options', 'UserId', 'description', 'price', 'title', 'updatedAt', 'createdAt']);
        expect(openingResult.price).to.equal(2);
        expect(openingResult.title).to.equal(opening.title);
        expect(openingResult.slots).to.equal(5);
        expect(openingResult.UserId).to.equal(1);
        expect(openingResult.TypeId).to.equal(typeid);
        expect(openingResult.options).to.have.length(options.length);
        expect(openingResult.FormTemplateId).to.equal(templateid);
        done(err);
      });
    });
  });
});
