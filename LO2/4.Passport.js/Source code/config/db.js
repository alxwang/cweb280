const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "",      
  database: "cab_book"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected");
  }
});

module.exports = db;
