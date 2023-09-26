import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Student from "../Models/student";
import Course from "../Models/course";

//add student
const addStudent = async (student: Student): Promise<Student> => {

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

    const response: OkPacket = await dal.execute(sql);
    student.id = response.insertId;
    return student;
}

//update student
const updateStudent = async (student: Student): Promise<Student> => {
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
    await dal.execute(sql);
    return student;
}


//delete student
const deleteStudent = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM students WHERE id=${id}`
    const response = await dal.execute(sql);
    
}

//all students
const getAllStudents = async (): Promise<Student[]> => {
    // command line for the DB
    const sql = `
        SELECT students.* , course.name AS course_id
        FROM students JOIN course
        ON students.course_id = course.id
    `;
    // a promise function that connects us to the database with the command line
    const students = await dal.execute(sql);
    return students;
}

//single students
const getSingleStudent = async (id:number): Promise<Student> => {
    const sql =  `
        SELECT students.* , course.name AS course_id
        FROM students JOIN course
        ON students.course_id = course.id
        WHERE students.id=${id}
        `;
    const student = await dal.execute(sql);
    return student;
}

const getAllCourses = async (): Promise<Course[]> => {
    const sql=`SELECT * FROM course`;
    const courses = await dal.execute(sql);
    return courses;
}

export default{
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getAllCourses,
    getSingleStudent
}