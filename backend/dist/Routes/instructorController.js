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
const instructorLogic_1 = __importDefault(require("../Logic/instructorLogic"));
const instructorRouter = express_1.default.Router();
instructorRouter.get("/all", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(200).json(yield instructorLogic_1.default.getAllInstructor());
}));
instructorRouter.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(200).json(yield instructorLogic_1.default.getSingleInstructor(id));
}));
instructorRouter.post("/add", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    response.status(201).json(yield instructorLogic_1.default.addInstructor(body));
}));
instructorRouter.delete("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    response.status(204).json(yield instructorLogic_1.default.deleteInstructor(id));
}));
instructorRouter.put("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    response.status(201).json(yield instructorLogic_1.default.updateInstructor(body));
}));
exports.default = instructorRouter;
