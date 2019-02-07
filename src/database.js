const sqlite3 = require('sqlite3').verbose();

global.db = 0;

exports.connectToDatabase = function() {
    global.db = new sqlite3.Database('assets/movies.db', (err) =>{
        if(err) {
            console.error(err.message);
        }
        console.log('Connected to database');
    });
}