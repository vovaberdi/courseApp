import { createStudents, createClasses } from './Utils/init';
// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import router from './Routes/controller';

const server = express();
const currentPort = config.port;
dal_mysql.execute(createStudents);
dal_mysql.execute(createClasses);
server.use(cors());
server.use(express.json());
server.use("/student",router);
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )