import {series} from 'async';
import {expect} from 'chai';
import app from '../../api';
import Bluebird from 'bluebird';
import request from 'supertest';
import models from '../../models';
import validate from '../../actions/validateFormData';

var agent = request.agent(app);
var customer = request.agent(app);
var openingid, templateid, typeid;
var inputs = [];
var options = [];

describe('Quote', () => {
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
          customer
            .post('/signup')
            .send({ username: 'jane', password: 'test', email: 'jane@example.com' })
            .expect(201, {status: 201, success: true, user: 'jane'})
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
            }),
        (cb) =>
          agent
            .post('/createType')
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
          }),
        (cb) =>
        agent
        .post('/openings')
        .send({title: 'Test Opening',
              price: '25.00',
              typeid: typeid,
              templateid: templateid,
              options: options,
              slots: 2})
        .end((err, res) => {
          openingid = res.body.opening.id;
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
    it('should allow a user to create a quote with no options selected', (done) => {
      const formdata = {name: 'Mark', email: 'mark@example.com'};
      const quote = {
        openingid: openingid,
        options: [],
        formdata: formdata
      }

      customer
      .post('/quote')
      .send(quote)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        const quoteResult = res.body.quote;
        expect(quoteResult.ArtistId).to.equal(1);
        expect(quoteResult.CustomerId).to.equal(2);
        expect(quoteResult.OpeningId).to.equal(openingid);
        expect(quoteResult.options_accepted_by_customer).to.have.length(0);
        expect(quoteResult.form_info).to.deep.equal(formdata);
        expect(quoteResult.payment_status).to.equal('pending');
        expect(quoteResult.ToAcceptId).to.equal(1);
        done(err)
      });
    });

    it('should allow a user to create a quote with one option selected', (done) => {
      const formdata = {name: 'Mark', email: 'mark@example.com'};
      const quote = {
        openingid: openingid,
        options: options,
        formdata: formdata
      }

      customer
      .post('/quote')
      .send(quote)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        const quoteResult = res.body.quote;
        expect(quoteResult.ArtistId).to.equal(1);
        expect(quoteResult.CustomerId).to.equal(2);
        expect(quoteResult.OpeningId).to.equal(openingid);
        expect(quoteResult.options_accepted_by_customer).to.have.length(1);
        expect(quoteResult.form_info).to.deep.equal(formdata);
        expect(quoteResult.payment_status).to.equal('pending');
        expect(quoteResult.ToAcceptId).to.equal(1);
        done(err)
      });
    });

  });
});
