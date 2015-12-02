#!/usr/bin/env node
if (process.env.NODE_ENV === 'production') {
  var newrelic = require('newrelic');
}

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/server');
