import axios from "axios";
import { useEffect, useState } from "react";
import "./ListStudents.css";
import { Table, Select, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Student from "../../../models/studentModal";
import { MyModal } from "../../popModal/popModal";
import { store } from "../../../store/store";
import PopDeleteBtn from "../../popDeleteBtn/popDeleteBtn";
import Instructor from "../../../models/instructorModel";
import { login } from "../../../store/student-state";
import API_URLS from "../../../config";


function ListStudents(): JSX.Element {

    const [student, setStudent] = useState<Student[]>([]);
    const [instructor,setInstructor] = useState<Instructor[]>([]);
    const [selectedOption, setSelectedOption] = useState<String>();

    const [wallChanged, setWallChanged] = useState(true);

    const handleDeleteCompany = (deletedStudentId: number) => {
        setStudent(student.filter(item => item.id !== deletedStudentId));
    };

 
    useEffect(() => {
         const url = API_URLS.allStudents;
         axios.get(url)
        .then((response) => {
          setStudent(response.data)
        }).catch((error) => {console.log("error", error);});

        const url2 = API_URLS.allInstructors;
        axios.get(url2)
        .then((response) => {
            setInstructor(response.data)
        }).catch((error) => {console.log("error", error);});
        
    }, []);



        //  const deleteStudent = store.getState().StudentState.student;
        // setStudent(student.filter(singleStudent => singleStudent.id !== id))


         const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedOption(value);
          };

         

    return (
        <div className="ListCustomer">
                        

            <TableContainer maxWidth="100%" align-self="center" rounded='md' boxShadow='dark-lg'>
                <Table variant='striped' colorScheme='teal' >
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>course</Th>
                        <Th>first_name</Th>
                        <Th>last_name</Th>
                        <Th>personal_id</Th>
                        <Th>data_of_birth</Th>
                        <Th>tel</Th>
                        <Th>address</Th>
                        <Th>email</Th>
                        <Th>Instructor</Th>
                        <Th>signature</Th>
                        <Th>Delete</Th>
                        <Th>Completed</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {student.map(item=><Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.course_id}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.personal_id}</Td>
                        <Td>{item.data_of_birth.toString().split('T')[0]}</Td>
                        <Td>{item.tel}</Td>
                        <Td>{item.address}</Td>
                        <Td>{item.email}</Td>
                        <Td>
                            <Select required onChange={selectChange}  size='sm'  mt="4rem" placeholder='Select course'>
                                    {instructor.map((item, i) => (
                                    <option  key={i}value={item.id}>{item.first_name}</option>))}
                            </Select>
                        </Td>
                        <Td><img src={item.signature} /></Td>
                        <Td onClick={() => setStudent} ><PopDeleteBtn itemType="student" id={item.id} onDelete={() => handleDeleteCompany(item.id)} /></Td>
                        <Td><MyModal id={item.id} course_id={item.course_id} first_name={item.first_name} last_name={item.last_name} personal_id={item.personal_id} tel={item.tel} address={item.address} email={item.email} signature={item.signature} data_of_birth={item.data_of_birth} companyId={item.companyId} instructor={`${selectedOption}`} /></Td>
                    </Tr>)} 
                </Tbody>
            </Table>
            </TableContainer>
            
        </div>
    );
}

export default ListStudents;




