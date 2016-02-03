require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  },
  testing: {
    isProduction: false
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || process.env.PORT || 8081,
  redisHost: process.env.REDISHOST || 'localhost',
  redisPort: process.env.REDISPORT || 6379,
  cookieAge: (365 * 24 * 60 * 60),
  app: {
    title: 'Commission Assistant',
    description: 'Modern Tool for Modern Artists',
    head: {
      titleTemplate: 'Commission Assistant: %s',
      meta: [
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Commission Assistant'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Commission Assistant'},
        {property: 'og:description', content: 'Modern Tool for Modern Artists'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@why_not_cats'},
        {property: 'og:creator', content: '@markbahnman'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
}, environment);
