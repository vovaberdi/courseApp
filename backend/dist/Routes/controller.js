"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentLogic_1 = __importDefault(require("../Logic/studentLogic"));
const emailSender_1 = __importDefault(require("../MiddleWare/emailSender"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = express_1.default.Router();
router.get("/allCourses", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(200).json(yield studentLogic_1.default.getAllCourses());
}));
router.get("/all", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(200).json(yield studentLogic_1.default.getAllStudents());
}));
router.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(200).json(yield studentLogic_1.default.getSingleStudent(id));
}));
router.post("/add", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    console.log(body);
    response.status(201).json(yield studentLogic_1.default.addStudent(body));
}));
router.delete("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(204).json(yield studentLogic_1.default.deleteStudent(id));
}));
router.put("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    response.status(201).json(yield studentLogic_1.default.updateStudent(body));
}));
router.use((0, express_fileupload_1.default)());
router.post("/pdf", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.body.userFile || !request.files.userFile) {
            return response.status(400).json({ error: 'No file uploaded' });
        }
        const userFile = request.body.userFile; // Cast to UploadedFile
        const fileName = `${request.body.last_name}.pdf`;
        const dockerPath = '/app/backend/uploads';
        // Move the file to the specified path
        userFile.mv(path_1.default.join(dockerPath, fileName), (error) => {
            if (error) {
                console.error('Error moving file:', error);
                return response.status(500).json({ error: 'Failed to save file' });
            }
            // Construct the dynamic file path
            const dynamicFilePath = path_1.default.join(dockerPath, fileName);
            console.log('Dynamic file path:', dynamicFilePath);
            console.log('Executing emailSender function...');
            // Send the PDF as an attachment in the email
            try {
                (0, emailSender_1.default)(request.body.email, dynamicFilePath); // Assuming emailSender is a function that works
                console.log('Email sent successfully');
            }
            catch (error) {
                console.log('Failed to send email:', error);
                return response.status(500).send('Failed to send email');
            }
            // Send response
            response.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: userFile.name,
                    MimeType: userFile.mimetype,
                    size: userFile.size,
                    imageLocation: `http://localhost:3001/${userFile.name}`
                }
            });
        });
    }
    catch (err) {
        console.log("Error:", err);
        response.status(500).send(err);
    }
}));
exports.default = router;
// import multer from 'multer';
// const upload = multer(); // Initialize multer
// router.post("/pdf", upload.single('pdfFile'), async (request: Request, response: Response, next: NextFunction) => {
//   try{
//     if (!request.body){
//       console.log('Files in the request:', request.body);
//         response.send({
//             status: false,
//             message: 'no file uploaded'
//         });
//     } else {
//       const uploadedFile = request.file;
//       const email = request.body.email;
//       const last_name = request.body.last_name;
//       console.log(uploadedFile);
//       console.log(email);
//       console.log(last_name);
//       const base64Data = request.body.pdfFile;
//       // Convert the base64 data to a Buffer
//       const binaryData = Buffer.from(base64Data, 'base64');
//       const fileName = request.body.last_name + ".pdf"; // You can use a dynamic name if needed
//       const filePath = path.join('/app/backend/uploads', fileName);
//       fs.writeFileSync(filePath, binaryData);
//       // Now you can use the filePath to send the email or perform other actions
//       // Construct the imageLocation URL
//       const imageLocation = `http://localhost:3001/${fileName}`;
//     // const userFile:any = request.body.blob;
//     // const dockerPath = '/app/backend/uploads';
//     // await userFile.mv('/app/backend/uploads' + request.body.last_name);
//     // Construct the dynamic file path
//     // const dynamicFilePath = path.join(dockerPath, `${request.body.last_name}.pdf`);
//     console.log('Dynamic file path:', filePath);
//     console.log('Executing emailSender function...');
//      // Send the PDF as an attachment in the email
//      try {
//       await emailSender(request.body.email, filePath);
//       console.log('Email sent successfully');
//     } catch (error) {
//       console.log('Failed to send email:', error);
//       response.status(500).send('Failed to send email');
//       return;
//     }
//             //send response
//             response.send({
//               status:true,
//               message: 'file is uploaded',
//               data:{
//                 imageLocation: imageLocation
//               }
//           })
//       }
//   } catch (err){
//       console.log("error :\n",err)
//       response.status(500).send(err);
//   }
// })
// export default router;
