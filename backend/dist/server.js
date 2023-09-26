"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./Utils/init");
// Main file in the SERVER 
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const route_not_found_1 = __importDefault(require("./MiddleWare/route-not-found"));
const config_1 = __importDefault(require("./Utils/config"));
const dal_mysql_1 = __importDefault(require("./Utils/dal_mysql"));
const controller_1 = __importDefault(require("./Routes/controller"));
const instructorController_1 = __importDefault(require("./Routes/instructorController"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const companyController_1 = __importDefault(require("./Routes/companyController"));
// import multer from 'multer';
// import path from 'path';
const server = (0, express_1.default)();
const currentPort = config_1.default.port;
// dal_mysql.execute(createDb);
// dal_mysql.execute(createStudents);
// dal_mysql.execute(createClasses);
// dal_mysql.execute(createInstructor);
// dal_mysql.execute(createCompany);
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Set up the storage for uploaded files
server.use(express_1.default.static('/uploads'));
//enable file uploading , and create a path for the files if it not exists
server.use((0, express_fileupload_1.default)({ createParentPath: true }));
server.use("/student", controller_1.default);
server.use("/instructor", instructorController_1.default);
server.use("/company", companyController_1.default);
server.use("*", route_not_found_1.default);
const MAX_RETRY_ATTEMPTS = 10;
const RETRY_INTERVAL_MS = 5000; // 5 seconds
const tryExecuteInitializationQueries = (retryCount) => {
    if (retryCount <= 0) {
        console.error("Max retry attempts reached. Exiting.");
        process.exit(1);
    }
    dal_mysql_1.default
        .execute(init_1.createDb)
        .then(() => {
        dal_mysql_1.default.execute(init_1.createStudents);
        dal_mysql_1.default.execute(init_1.createClasses);
        dal_mysql_1.default.execute(init_1.createInstructor);
        dal_mysql_1.default.execute(init_1.createCompany);
        console.log("Database initialization successful.");
    })
        .catch((error) => {
        console.error(`Error during database initialization: ${error.message}`);
        console.log(`Retry attempt ${MAX_RETRY_ATTEMPTS - retryCount + 1}`);
        setTimeout(() => tryExecuteInitializationQueries(retryCount - 1), RETRY_INTERVAL_MS);
    });
};
// Wait for the database to become available before executing the initialization queries
const waitForDatabase = () => {
    dal_mysql_1.default
        .execute("SELECT 1") // Use a basic query to check the database connection
        .then(() => {
        console.log("Database is ready.");
        tryExecuteInitializationQueries(MAX_RETRY_ATTEMPTS);
    })
        .catch(() => {
        console.log("Database is not yet ready. Retrying in 5 seconds...");
        setTimeout(waitForDatabase, RETRY_INTERVAL_MS);
    });
};
waitForDatabase();
// ... (remaining server setup)
server.listen(currentPort, () => {
    console.log(`listening on http://localhost:${currentPort}`);
});
