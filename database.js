const mariadb = require('mariadb');
const config = require('./config.json');

const pool = mariadb.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 5
});

async function getConnection() {
  let conn;
  try {
	conn = await pool.getConnection();
  return conn;
  } catch (err) {
	throw err;
  }
}

module.exports = {
    getConnection
};