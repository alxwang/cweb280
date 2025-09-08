require("reflect-metadata");
const { DataSource } = require("typeorm");
const { Member } = require("../entity/Member");
const { Book } = require("../entity/Book");
const { BorrowRecord } = require("../entity/BorrowRecord");

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "library_management",
    synchronize: true,   // auto create tables
    logging: true,
    entities: [Member,Book,BorrowRecord],
});

module.exports = { AppDataSource };
