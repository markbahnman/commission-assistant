import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const cfg = config[env];
// console.log('Attempting to setup conncetion to database', env);
// console.log(config);
const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg.options);
// const sequelize = new Sequelize(cfg.connectURL);
// console.log('Database setup');

const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
