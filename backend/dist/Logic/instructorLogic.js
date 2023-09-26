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
const dal_mysql_1 = __importDefault(require("../Utils/dal_mysql"));
const addInstructor = (instructor) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO instructor VALUES
    (DEFAULT,
    '${instructor.first_name}',
    '${instructor.last_name}',
     ${instructor.personal_id},
    '${instructor.data_of_birth}',
    '${instructor.tel}',
    '${instructor.address}',
    ${instructor.license_number},
    ${instructor.years_of_experience},
    '${instructor.license_exp_date}',
    '${instructor.signature}'
    )`;
    // const sql = "INSERT INTO `collage`.`students` (`id`, `course_id`, `first_name`, `last_name`, `personal_id`, `data_of_birth`, `tel`, `address`, `email`) VALUES (DEFAULT, ${student.course_id}, '${student.first_name}', '${student.last_name}', ${student.personal_id}, '${student.data_of_birth}', '${student.tel}', '${student.address}', '${student.email}')";
    const response = yield dal_mysql_1.default.execute(sql);
    instructor.id = response.insertId;
    return instructor;
});
const updateInstructor = (instructor) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE students 
    SET first_name = '${instructor.first_name}',
    last_name = '${instructor.last_name}',
    personalId = '${instructor.personal_id}',
    data_of_birth = '${instructor.data_of_birth}',
    tel = '${instructor.tel}',
    address = '${instructor.address}',
    license_number = ${instructor.license_number},
    years_of_experience = ${instructor.years_of_experience},
    license_exp_date = '${instructor.license_exp_date}',
    signature = '${instructor.signature}',
    WHERE id = ${instructor.id}
    `;
    yield dal_mysql_1.default.execute(sql);
    return instructor;
});
const deleteInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    DELETE FROM instructor WHERE id=${id}`;
    const response = yield dal_mysql_1.default.execute(sql);
});
const getSingleInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM instructor WHERE instructor.id=${id}`;
    const instructor = yield dal_mysql_1.default.execute(sql);
    return instructor;
});
const getAllInstructor = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM instructor`;
    const instructor = yield dal_mysql_1.default.execute(sql);
    return instructor;
});
exports.default = {
    getAllInstructor,
    getSingleInstructor,
    addInstructor,
    deleteInstructor,
    updateInstructor
};
