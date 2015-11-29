import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from './utils/url.js';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
const app = express();

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.status(result.status || 200).json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          if (process.env.NODE_ENV !== 'testing') {
            console.error('API ERROR:', pretty.render(reason));
          }
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

if (!config.apiPort) {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}

module.exports = app;
