import express, {NextFunction, Request, Response} from 'express';
import studentLogic from '../Logic/studentLogic';
import emailSender from '../MiddleWare/emailSender';
import path from 'path';
import fs from 'fs';
import fileUpload from 'express-fileupload';







const router = express.Router();

router.get("/allCourses", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await studentLogic.getAllCourses());
})

router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await studentLogic.getAllStudents())
})

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await studentLogic.getSingleStudent(id));
})

router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  console.log(body);
  response.status(201).json( await studentLogic.addStudent(body))
})

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await studentLogic.deleteStudent(id))
})

router.put("/", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await studentLogic.updateStudent(body));
})


router.use(fileUpload());

router.post("/pdf", async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (!request.body.userFile || !request.files.userFile) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    const userFile = request.body.userFile as fileUpload.UploadedFile; // Cast to UploadedFile
    const fileName = `${request.body.last_name}.pdf`;
    const dockerPath = '/app/backend/uploads';

    // Move the file to the specified path
    userFile.mv(path.join(dockerPath, fileName), (error) => {
      if (error) {
        console.error('Error moving file:', error);
        return response.status(500).json({ error: 'Failed to save file' });
      }

      // Construct the dynamic file path
      const dynamicFilePath = path.join(dockerPath, fileName);

      console.log('Dynamic file path:', dynamicFilePath);
      console.log('Executing emailSender function...');

      // Send the PDF as an attachment in the email
      try {
        emailSender(request.body.email, dynamicFilePath); // Assuming emailSender is a function that works
        console.log('Email sent successfully');
      } catch (error) {
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
  } catch (err) {
    console.log("Error:", err);
    response.status(500).send(err);
  }
});

export default router;

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


