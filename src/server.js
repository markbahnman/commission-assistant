import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import config from './config';
// import redisSession from 'connect-redis';
// import favicon from 'serve-favicon';
// import session from 'express-session';
import compression from 'compression';
import httpProxy from 'http-proxy';
import helmet from 'helmet';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import createHistory from 'history/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: 'http://' + config.apiHost + ':' + config.apiPort
});

app.use(helmet());
app.use(compression());

// const RedisStore = redisSession(session);
// const redisOptions = {
//   'host': config.redisHost,
//   'port': config.redisPort
// };

// app.use(session({
//   store: new RedisStore(redisOptions),
//   secret: 'react and redux rule!!!!',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: config.cookieAge }
// }));
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const history = createHistory();

  const store = createStore(getRoutes, history, client);

  function hydrateOnClient() {

    res.send('<!doctype html>\n' +
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl },
        (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer(renderProps, store, {client}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} ReduxRouter/>
          </Provider>
        );

        res.status(200);

        global.navigation = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> %s is running', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
