module.exports = {
  'development': {
    'username': 'markbahnman',
    'password': null,
    'database': 'assistant_dev',
    'options': {
      'dialect': 'postgres',
      'host': 'localhost',
      'post': 5432,
      'native': true
    }
  },
  'testing': {
    'username': 'markbahnman',
    'password': null,
    'database': 'assistant_test',
    'options': {
      'logging': false,
      'host': 'localhost',
      'post': 5432,
      'dialect': 'postgres',
      'native': true
    }
  },
  'production': {
    'username': 'markbahnman',
    'password': null,
    'database': 'assistant_prod',
    'options': {
      'host': 'localhost',
      'post': 5432,
      'dialect': 'postgres',
      'native': true
    }
  }
};
