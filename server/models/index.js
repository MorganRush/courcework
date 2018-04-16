const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

const sequelize = new Sequelize('postgres://mmxcxsfnpnucsz:ccdba59bddd30de77136258f309ba0c3d19956125948112da4711491c6666471@ec2-54-197-254-189.compute-1.amazonaws.com:5432/dcmfh2o15unikr?ssl=true', {
  ssl: true,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], {
//         ssl: true,
//         dialectOptions: {
//             ssl: {
//                 require: true
//             }
//         }
//     });
// } else {
//     sequelize = new Sequelize(
//         config.database, config.username, config.password, config
//     );
// }

// const sequelize = new Sequelize(
//     configJS.db.database,
//     configJS.db.user,
//     configJS.db.password,
//     configJS.db.options,
// );

fs
    .readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
