var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__ROOT + 'database.sqlite', sqlite3.OPEN_READONLY,
    function (err)
    {
        if (err)
            throw err
    }
);

module.exports = db;
