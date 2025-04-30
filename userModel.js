const db = require('./dbUtil.js');

exports.getAllUsers = () => {
    return db.query('select * from users');
}

exports.createUser = (username, password, password1) => {
    return db.query('insert into users (username, password, password1) VALUES (?, ?, ?)', [username, password, password1]);
}
