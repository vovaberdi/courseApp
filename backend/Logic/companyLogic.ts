import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Course from "../Models/course";
import Company from "../Models/company";

const addCompany  = async (company : Company ): Promise<Company > => {

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

    const response: OkPacket = await dal.execute(sql);
    company.id = response.insertId;
    return company;
}

const updateCompany = async (company : Company ): Promise<Company> => {
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
    await dal.execute(sql);
    return company;
}


const deleteCompany = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM company WHERE id=${id}`
    const response = await dal.execute(sql);
    
}

const getSingleCompany = async (id:number): Promise<Company> => {
    const sql =  `SELECT * FROM company WHERE company.id=${id}`;
    const company = await dal.execute(sql);
    return company;
}

const getAllCompany = async (): Promise<Course[]> => {
    const sql=`SELECT * FROM company`;
    const company = await dal.execute(sql);
    return company;
}

export default{
    getAllCompany,
    getSingleCompany,
    addCompany,
    deleteCompany,
    updateCompany
}