import express from 'express';
import cors from 'cors';
import compression from 'compression';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from './utils/url.js';
import respond from './utils/respondFromPromise.js';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
const app = express();

const whitelist = ['http://localhost', 'http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: function(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.use(cors(corsOptions));
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());
app.use(compression());

app.post('/login', respond(actions.login));
app.get('/health', respond(actions.health));
app.post('/signup', respond(actions.signup));

// 404 handler
app.use((req, res) => {
  console.log("404 handler firing for url", req.url);
  res.status(404).json({status: 404, error: 'Here be dragons'});
});
if (!config.apiPort) {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}

module.exports = app;
