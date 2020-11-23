const connection = require('../config');

function SaleRentApartments(status) {
    let sql = 'select * from apartments where sale_status = ? or sale_status = ?'
    return new Promise((resolve,reject) => {
        connection.query(sql, [status, 'both'], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function totalSaleRentApartments(status) {
    let sql = 'SELECT COUNT(sale_status) as "total" FROM apartments where sale_status IN (?,?)'
    return new Promise((resolve,reject) => {
        connection.query(sql, [status, 'both'], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    SaleRentApartments,
    totalSaleRentApartments
};
