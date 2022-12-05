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

export default router;