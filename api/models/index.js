import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const env = process.env.NODE_ENV || "development";
const cfg = config[env];
console.log('Attempting to setup conncetion to database', env);
const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg.options);
// const sequelize = new Sequelize(cfg.connectURL);
console.log('Database setup');

let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
