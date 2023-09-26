"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFoundError = exports.ClientError = void 0;
// base ClientError class
class ClientError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
exports.ClientError = ClientError;
// "Child" ClientError class
class RouteNotFoundError extends ClientError {
    constructor(route) {
        super(404, ` route ${route} not found`);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
