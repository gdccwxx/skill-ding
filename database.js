const mysql      = require('mysql');

let pool = mysql.createPool({
    host : 'localhost' ,
    port : '3306',
    user : 'masters',
    password : 'masters',
    database : 'skill',
    connectionLimit : 10,
    waitForConnections : false,
    charset: 'utf8mb4'
});

function query_async(sql) {
    return new Promise(function (resolve, reject) {
        pool.query(sql, function (error, results, fields) {
            if (error) {
                return reject(error);
            }
            return resolve({
                result : results,
                fields : fields
            });
        });
    });
}
module.exports = {
    query_async
};
