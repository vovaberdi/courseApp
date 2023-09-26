"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instructor {
    constructor() {
        this.id = 0;
        this.first_name = "";
        this.last_name = "";
        this.personal_id = 0;
        this.data_of_birth = new Date();
        this.tel = "";
        this.address = "";
        this.years_of_experience = 0;
        this.license_number = 0;
        this.license_exp_date = new Date();
        this.signature = "";
    }
}
exports.default = Instructor;
