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
const companyLogic_1 = __importDefault(require("../Logic/companyLogic"));
const companyRouter = express_1.default.Router();
companyRouter.get("/allCompany", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(200).json(yield companyLogic_1.default.getAllCompany());
}));
companyRouter.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(200).json(yield companyLogic_1.default.getSingleCompany(id));
}));
companyRouter.post("/add", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    response.status(201).json(yield companyLogic_1.default.addCompany(body));
}));
companyRouter.delete("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(204).json(yield companyLogic_1.default.deleteCompany(id));
}));
companyRouter.put("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    response.status(201).json(yield companyLogic_1.default.updateCompany(body));
}));
exports.default = companyRouter;
