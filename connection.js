const mysql = require('mysql')

let conn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: null,
    database: 'shopping'
});
conn.connect((err) => {
    if(err) throw err;
    console.log('connection created')
});

module.exports = conn