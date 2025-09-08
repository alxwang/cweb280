const { DataSource } = require('typeorm');
const User = require('./entity/User');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',       // your MySQL username
    password: '',           // your MySQL password
    database: 'libraries_to_validate',    // make sure this DB exists
    synchronize: true,      // auto-create tables
    logging: false,
    entities: [User],
});

module.exports = AppDataSource;