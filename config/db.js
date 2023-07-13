const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  })
  
  db.connect((err)=>{
    if(err){
      console.log(err);
      return;
    }
    console.log("Connected to database succefully..");
  });

  module.exports = db

