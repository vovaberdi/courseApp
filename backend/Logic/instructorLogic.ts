import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Course from "../Models/course";
import Instructor from "../Models/instructor";

const addInstructor = async (instructor: Instructor): Promise<Instructor> => {

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

    const response: OkPacket = await dal.execute(sql);
    instructor.id = response.insertId;
    return instructor;
}

const updateInstructor = async (instructor: Instructor): Promise<Instructor> => {
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
    await dal.execute(sql);
    return instructor;
}


const deleteInstructor = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM instructor WHERE id=${id}`
    const response = await dal.execute(sql);
    
}

const getSingleInstructor = async (id:number): Promise<Instructor> => {
    const sql =  `SELECT * FROM instructor WHERE instructor.id=${id}`;
    const instructor = await dal.execute(sql);
    return instructor;
}

const getAllInstructor = async (): Promise<Course[]> => {
    const sql=`SELECT * FROM instructor`;
    const instructor = await dal.execute(sql);
    return instructor;
}

export default{
    getAllInstructor,
    getSingleInstructor,
    addInstructor,
    deleteInstructor,
   updateInstructor
}