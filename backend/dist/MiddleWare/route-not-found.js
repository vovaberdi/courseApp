"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_errors_1 = require("../Models/client-errors");
// middleware functions
const ErrorHandler = (request, response, next) => {
    const err = new client_errors_1.RouteNotFoundError(request.originalUrl);
    next(err);
};
// exporting
exports.default = ErrorHandler;
