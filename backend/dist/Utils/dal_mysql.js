"use strict";
//DAL -> Data Abstract Layer
//to to install mysql -> npm install mysql
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("./config"));
const connection = mysql_1.default.createPool({
    host: config_1.default.mySQLhost,
    user: config_1.default.mySQLUser,
    password: config_1.default.mySQLPassword,
    database: config_1.default.mySQLdb,
});
console.log("we are connected to the DB");
const execute = (sql) => {
    return new Promise((resolve, reject) => {
        //execute the sql on mysql server
        connection.query(sql, (err, result) => {
            //if we got an error, exit with reject and return
            if (err) {
                reject(err);
                return;
            }
            //return the result....
            resolve(result);
        });
    });
};
exports.default = { execute };
