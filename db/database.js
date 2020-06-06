// required connections
const mysql = require('mysql2');

// create datbase constructor
class Database {
   constructor(config) {
      this.connection = mysql.createConnection(config);
   }

   query(sql, args) {
      return new Promise((resolve, error) => {
         this.connection.query(sql, args, (err, rows) => {
            if (err) {
               console.log(error.sql);
               return error(err);
            }
            resolve(rows);
         });
      });
   }

   close() {
      return new Promist((resolve, error) => {
         this.connection.end(err => {
            if (err) return reject(err);
            resolve();
         });
      });
   }
}

module.exports = Database;