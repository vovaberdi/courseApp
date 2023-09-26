import express, {NextFunction, Request, Response} from 'express';
import companyLogic from '../Logic/companyLogic';


const companyRouter = express.Router();

companyRouter.get("/allCompany", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await companyLogic.getAllCompany())
})

companyRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await companyLogic.getSingleCompany(id));
})

companyRouter.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await companyLogic.addCompany(body))
})

companyRouter.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await companyLogic.deleteCompany(id))
})

companyRouter.put("/", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await companyLogic.updateCompany(body));
})

export default companyRouter;