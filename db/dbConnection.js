// This file is created to have a one stop shop for getting to the database information

// required files
const Database = require('./database');

// create connection to the database
const db = new Database({
   host: 'localhost',
   port: 3306,
   user: 'cmsuser',
   password: 'shinyarmor',
   database: 'cms'
});

module.exports = db;