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
  apiPort: process.env.APIPORT,
  app: {
    title: 'Commission Assistant',
    description: 'Modern Tool for Modern Artists',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Commission Assistant',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Commission Assistant',
        'og:description': 'Modern Tool for Modern Artists',
        'twitter:card': 'summary',
        'twitter:site': '@why_not_cats',
        'twitter:creator': '@markbahnman',
        'twitter:title': 'Commission Assistant',
        'twitter:description': 'Modern Tool for Modern Artists',
        'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
