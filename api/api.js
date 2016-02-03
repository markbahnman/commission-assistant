import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import redisSession from 'connect-redis';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from './utils/url.js';
import respond from './utils/respondFromPromise.js';
import auth from './utils/authenticateMiddleware.js';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
const app = express();

const whitelist = ['http://localhost', 'http://localhost:3000', 'http://localhost:3001', 'http://commissionassistantweb.elasticbeanstalk.com', 'http://commissionassistantapi.elasticbeanstalk.com'];
const corsOptions = {
  origin: function(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.use(helmet());
app.use(cors(corsOptions));

const RedisStore = redisSession(session);
const redisOptions = {
  'host': config.redisHost,
  'port': config.redisPort
};

app.use(session({
  store: new RedisStore(redisOptions),
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: config.cookieAge }
}));
app.use(bodyParser.json());
app.use(compression());

app.post('/login', respond(actions.login));
app.get('/health', respond(actions.health));
app.post('/signup', respond(actions.signup));
app.get('/loadAuth', respond(actions.loadAuth));
app.post('/openings', respond(actions.createOpening));
app.get('/openings', respond(actions.loadOpenings));
app.post('/option', respond(actions.createOption));
app.get('/logout', respond(actions.logout));

app.get('/type', respond(actions.loadTypes));
app.post('/type', respond(actions.createType));

app.post('/inputType', respond(actions.createInputType));
app.post('/formTemplate', respond(actions.createTemplate));
app.post('/createForm', respond(actions.createForm));
app.post('/createType', respond(actions.createType));
app.post('/quote', respond(actions.createQuote));

// 404 handler
app.use((req, res) => {
  console.log("404 handler firing for url", req.url);
  res.status(404).json({status: 404, error: 'Here be dragons'});
});
if (!config.apiPort) {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}

module.exports = app;
