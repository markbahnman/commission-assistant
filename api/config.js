module.exports = {
  'development': {
    'username': process.env.RDS_USERNAME || 'markbahnman',
    'password': process.env.RDS_PASSWORD || null,
    'database': process.env.RDS_DB_NAME || 'assistant_dev',
    'options': {
      'dialect': 'postgres',
      'host': process.env.RDS_HOSTNAME || 'localhost',
      'port': process.env.RHD_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      'native': true
    }
  },
  'testing': {
    'username': process.env.RDS_USERNAME || 'markbahnman',
    'password': null,
    'database': 'assistant_test',
    'options': {
      'logging': false,
      'host': 'localhost',
      'port': 5432,
      'dialect': 'postgres',
      'native': true
    }
  },
  'production': {
    'username': process.env.RDS_USERNAME || 'markbahnman',
    'password': process.env.RDS_PASSWORD || null,
    'database': process.env.RDS_DB_NAME || 'assistant_prod',
    'options': {
      'host': process.env.RDS_HOSTNAME || 'localhost',
      'port': process.env.RDS_PORT ? parseInt(process.env.RDS_PORT, 10) : 5432,
      'dialect': 'postgres',
      'native': true
    }
  }
};
