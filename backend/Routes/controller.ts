import express, {NextFunction, Request, Response} from 'express';
import studentLogic from '../Logic/studentLogic';


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

router.post("/pdf", async (request: Request, response: Response, next: NextFunction) => {
  try{
    if (!request.files){
        response.send({
            status: false,
            message: 'no file uploaded'
        });
    } else {
      console.log("bbbb")

    let userFile:any = request.files.userFile;
    // const uploadPath = "./src/uploads/" + userFile.name;
    userFile.mv("./uploads/"+userFile.name);
    
            //send response
            response.send({
              status:true,
              message: 'file is uploaded',
              data:{
                  name: userFile.name,
                  MimeType:userFile.mimetype,
                  size: userFile.size,
                  imageLocation: "http://localhost:3001/"+userFile.name
              }
          })
      }

  } catch (err){
      console.log("error :\n",err)
      response.status(500).send(err);
  }
})


export default router;