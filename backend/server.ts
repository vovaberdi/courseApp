import { createStudents, createClasses, createInstructor, createDb, createCompany } from './Utils/init';
// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import router from './Routes/controller';
import instructorRouter from './Routes/instructorController';
import fileupload from 'express-fileupload';
import bodyParser from 'body-parser';
import companyRouter from './Routes/companyController';
// import multer from 'multer';
// import path from 'path';




const server = express();
const currentPort = config.port;

// dal_mysql.execute(createDb);
// dal_mysql.execute(createStudents);
// dal_mysql.execute(createClasses);
// dal_mysql.execute(createInstructor);
// dal_mysql.execute(createCompany);

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(cors());
server.use(express.json());

// Set up the storage for uploaded files


server.use(express.static('/uploads'));

//enable file uploading , and create a path for the files if it not exists
server.use(fileupload({createParentPath: true}));
server.use("/student",router);
server.use("/instructor",instructorRouter);
server.use("/company",companyRouter);
server.use("*", ErrorHandler);



const MAX_RETRY_ATTEMPTS = 10;
const RETRY_INTERVAL_MS = 5000; // 5 seconds

const tryExecuteInitializationQueries = (retryCount: number) => {
  if (retryCount <= 0) {
    console.error("Max retry attempts reached. Exiting.");
    process.exit(1);
  }

  dal_mysql
    .execute(createDb)
    .then(() => {
      dal_mysql.execute(createStudents);
      dal_mysql.execute(createClasses);
      dal_mysql.execute(createInstructor);
      dal_mysql.execute(createCompany);
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
  dal_mysql
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

