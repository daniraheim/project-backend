const db = require('./dbUtil.js');

exports.getAllUsers = (username, password) => {
    return db.query('select * from users where username = ? and password = ?' , [username, password]);
}

exports.createUser = (username, password, password1) => {
    return db.query('insert into users (username, password, password1) VALUES (?, ?, ?)', [username, password, password1]);
}
