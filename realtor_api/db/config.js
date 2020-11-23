var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'MySQL123456',
  database : 'realtor'
});

module.exports = connection;