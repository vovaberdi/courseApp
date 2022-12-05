import express, {NextFunction, Request, Response} from 'express';
import instructorLogic from '../Logic/instructorLogic';


const instructorRouter = express.Router();

instructorRouter.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await instructorLogic.getAllInstructor())
})

instructorRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await instructorLogic.getSingleInstructor(id));
})

instructorRouter.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await instructorLogic.addInstructor(body))
})

instructorRouter.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await instructorLogic.deleteInstructor(id))
})

instructorRouter.put("/", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await instructorLogic.updateInstructor(body));
})

export default instructorRouter;