import "./listInstructor.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { MyModal } from "../../popModal/popModal";
import { store } from "../../../store/store";
import PopDeleteBtn from "../../popDeleteBtn/popDeleteBtn";
import Instructor from "../../../models/instructorModel";
import API_URLS from "../../../config";

function ListInstructor(): JSX.Element {

    const [instructor, setInstructor] = useState<Instructor[]>([]);

    const handleDeleteCompany = (deletedStudentId: number) => {
        setInstructor(instructor.filter(item => item.id !== deletedStudentId));
    };

 
    useEffect(() => {
         const url = API_URLS.allInstructors;
         axios.get(url)
        .then((response) => {

          setInstructor(response.data);

        }).catch((error) => {console.log("error", error);});
    }, []);

        // setStudent(student.filter(singleStudent => singleStudent.id !== id))


         const signature = store.getState().StudentState.student;
    return (
        <div className="listInstructor">


<TableContainer maxWidth="100%" align-self="center" rounded='md' boxShadow='dark-lg'>
                <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>first_name</Th>
                        <Th>last_name</Th>
                        <Th>personal_id</Th>
                        <Th>data_of_birth</Th>
                        <Th>tel</Th>
                        <Th>address</Th>
                        <Th>license_number</Th>
                        <Th>years_of_experience</Th>
                        <Th>license_exp_date</Th>
                        <Th>signature</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {instructor.map(item=><Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.personal_id}</Td>
                        <Td>{item.data_of_birth.toString().split('T')[0]}</Td>
                        <Td>{item.tel}</Td>
                        <Td>{item.address}</Td>
                        <Td>{item.license_number}</Td>
                        <Td>{item.years_of_experience}</Td>
                        <Td>{item.license_exp_date.toString().split('T')[0]}</Td>
                        <Td><img src={item.signature} /></Td>
                        <Td><PopDeleteBtn itemType="instructor" id={item.id} onDelete={() => handleDeleteCompany(item.id)} /></Td>
                    </Tr>)} 
                </Tbody>
            </Table>
            </TableContainer>
            
			
        </div>
    );
}

export default ListInstructor;
