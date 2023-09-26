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
const addCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO company VALUES
    (DEFAULT,
    '${company.first_name}',
    '${company.last_name}',
     ${company.personal_id},
    '${company.tel}',
    '${company.address}',
    '${company.factory_name}',
    ${company.postal_code}
    )`;
    // const sql = "INSERT INTO `collage`.`students` (`id`, `course_id`, `first_name`, `last_name`, `personal_id`, `data_of_birth`, `tel`, `address`, `email`) VALUES (DEFAULT, ${student.course_id}, '${student.first_name}', '${student.last_name}', ${student.personal_id}, '${student.data_of_birth}', '${student.tel}', '${student.address}', '${student.email}')";
    const response = yield dal_mysql_1.default.execute(sql);
    company.id = response.insertId;
    return company;
});
const updateCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE students 
    SET first_name = '${company.first_name}',
    last_name = '${company.last_name}',
    personal_id = '${company.personal_id}',
    postal_code = '${company.postal_code}',
    tel = '${company.tel}',
    address = '${company.address}',
    WHERE id = ${company.id}
    `;
    yield dal_mysql_1.default.execute(sql);
    return company;
});
const deleteCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    DELETE FROM company WHERE id=${id}`;
    const response = yield dal_mysql_1.default.execute(sql);
});
const getSingleCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM company WHERE company.id=${id}`;
    const company = yield dal_mysql_1.default.execute(sql);
    return company;
});
const getAllCompany = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM company`;
    const company = yield dal_mysql_1.default.execute(sql);
    return company;
});
exports.default = {
    getAllCompany,
    getSingleCompany,
    addCompany,
    deleteCompany,
    updateCompany
};
