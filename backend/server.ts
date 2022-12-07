import { createStudents, createClasses, createInstructor } from './Utils/init';
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



const server = express();
const currentPort = config.port;
dal_mysql.execute(createStudents);
dal_mysql.execute(createClasses);
dal_mysql.execute(createInstructor);
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(cors());
server.use(express.json());
server.use(express.static('/uploads'));
//enable file uploading , and create a path for the files if it not exists
server.use(fileupload({createParentPath: true}));
server.use("/student",router);
server.use("/instructor",instructorRouter);
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )