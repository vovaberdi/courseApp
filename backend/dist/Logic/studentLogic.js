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
//add student
const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO students VALUES
    (DEFAULT,
     ${student.course_id},
     ${student.companyId},
    '${student.first_name}',
    '${student.last_name}',
     ${student.personal_id},
    '${student.data_of_birth}',
    '${student.tel}',
    '${student.address}',
    '${student.email}',
    '${student.signature}'
    )`;
    // const sql = "INSERT INTO `collage`.`students` (`id`, `course_id`, `first_name`, `last_name`, `personal_id`, `data_of_birth`, `tel`, `address`, `email`) VALUES (DEFAULT, ${student.course_id}, '${student.first_name}', '${student.last_name}', ${student.personal_id}, '${student.data_of_birth}', '${student.tel}', '${student.address}', '${student.email}')";
    const response = yield dal_mysql_1.default.execute(sql);
    student.id = response.insertId;
    return student;
});
//update student
const updateStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE students 
    SET course_id = ${student.course_id},
    first_name = '${student.first_name}',
    last_name = '${student.last_name}',
    personalId = '${student.personal_id}',
    data_of_birth = '${student.data_of_birth}',
    tel = '${student.tel}',
    address = '${student.address}',
    email = '${student.email}',
    signature = '${student.signature}',
    WHERE id = ${student.id}
    `;
    yield dal_mysql_1.default.execute(sql);
    return student;
});
//delete student
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    DELETE FROM students WHERE id=${id}`;
    const response = yield dal_mysql_1.default.execute(sql);
});
//all students
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    // command line for the DB
    const sql = `
        SELECT students.* , course.name AS course_id
        FROM students JOIN course
        ON students.course_id = course.id
    `;
    // a promise function that connects us to the database with the command line
    const students = yield dal_mysql_1.default.execute(sql);
    return students;
});
//single students
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
        SELECT students.* , course.name AS course_id
        FROM students JOIN course
        ON students.course_id = course.id
        WHERE students.id=${id}
        `;
    const student = yield dal_mysql_1.default.execute(sql);
    return student;
});
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM course`;
    const courses = yield dal_mysql_1.default.execute(sql);
    return courses;
});
exports.default = {
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getAllCourses,
    getSingleStudent
};
