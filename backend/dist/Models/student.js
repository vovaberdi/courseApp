"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    constructor() {
        this.id = 0;
        this.course_id = 0;
        this.first_name = "";
        this.last_name = "";
        this.personal_id = 0;
        this.data_of_birth = new Date();
        this.tel = "";
        this.address = "";
        this.email = "";
        this.signature = "";
    }
}
exports.default = Student;
