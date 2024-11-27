"use strict";
// import mysql from 'promise-mysql';
// import keys from './keys';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = mysql.createPool(keys.database);
// pool.getConnection().then(connection => {
//     pool.releaseConnection(connection);
//     console.log('DB is connected');
// }).catch(err => {
//     console.error('Error connecting to the database: ', err);
// });
// export default pool;
const promise_mysql_1 = __importDefault(require("promise-mysql")); // Cambia a mysql2/promise
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
}).catch(err => {
    console.error('Error connecting to the database: ', err);
});
exports.default = pool;
