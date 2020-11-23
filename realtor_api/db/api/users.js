const connection = require('../config');
const UsersBuilder = require('./users_builder');
const crypto = require('crypto');


function getAllUsers({id, role_id, first_name, last_name, email, password, phone, status, page = 1, size = 10}) {
    const builder = new UsersBuilder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allUsers(page, size)
                        .id(id)
                        .role_id(role_id)
                        .first_name(first_name)
                        .last_name(last_name)
                        .email(email)
                        .password(password)
                        .phone(phone)
                        .status(status)
                        .build()
        connection.query(query, [...params,page,size], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function UserbyId(userId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users where id = ?',[userId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

async function SearchUser(email,password) {
    let sql = 'select * from users where email = ? and password = ?'

    let cryptPassword = crypto.pbkdf2Sync(password, 'realtorrocks', 100000, 64, 'sha512'); 
    const passwordHashed = cryptPassword.toString('base64');

    return new Promise((resolve,reject) => {
        connection.query(sql, [email, passwordHashed], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function RegisterUser(new_user) {
    let sql = 'INSERT INTO users SET ?'
    return new Promise((resolve,reject) => {
        connection.query(sql, new_user, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function updateUserStatus(new_user) {
    let sql = "UPDATE users SET status = ? WHERE id = ?"
    return new Promise((resolve,reject) => {
        connection.query(sql, [new_user.status,new_user.id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getAllUsers,
    UserbyId,
    SearchUser,
    RegisterUser,
    updateUserStatus
};