// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import studentLogic from '../Logic/studentLogic';


// generic router 
const router = express.Router();

router.get("/allCourses", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await studentLogic.getAllCourses());
})

// gets information from DB
router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await studentLogic.getAllStudents())
})

//get single student
router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await studentLogic.getSingleStudent(id));
})

// sends information to DB
router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await studentLogic.addStudent(body))
})

// delete information from DB
router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await studentLogic.deleteStudent(id))
})

// update information in DB
router.put("/", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await studentLogic.updateStudent(body));
})

export default router;