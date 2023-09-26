"use strict";
// Configuration
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.port = 3001;
        // mysql database
        // public mySQLhost = 'db';
        this.mySQLhost = 'localhost';
        this.mySQLUser = "root";
        this.mySQLPassword = "12345678";
        this.mySQLdb = "collage";
        //another database
    }
}
const config = new Config();
exports.default = config;
