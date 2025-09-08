const { DataSource } = require('typeorm');
const User = require('./entity/User');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',       // change according to your MySQL
    password: '',           // change according to your MySQL
    database: 'typeorm_entities',    // make sure this DB exists
    synchronize: true,      // auto-create tables
    logging: false,
    entities: [User],
});
module.exports = AppDataSource; 