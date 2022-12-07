import "./listInstructor.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { MyModal } from "../../popModal/popModal";
import { store } from "../../../store/store";
import PopDeleteBtn from "../../popDeleteBtn/popDeleteBtn";
import Instructor from "../../../models/instructorModel";

function ListInstructor(): JSX.Element {

    const [instructor, setInstructor] = useState<Instructor[]>([]);
 
    useEffect(() => {
         const url = "http://localhost:3001/instructor/all";
         axios.get(url)
        .then((response) => {

          setInstructor(response.data);

        }).catch((error) => {console.log("error", error);});
    }, []);

        // setStudent(student.filter(singleStudent => singleStudent.id !== id))


         const signature = store.getState().StudentState.student;
    return (
        <div className="listInstructor">


<TableContainer maxWidth="80%" align-self="center" rounded='md' boxShadow='dark-lg'>
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
                        <Th>Completed</Th>
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
                        <Td><PopDeleteBtn id={item.id} first_name={item.first_name} last_name={item.last_name} personal_id={item.personal_id} data_of_birth={item.data_of_birth} tel={item.tel} address={item.address} signature={""} course_id={0} email={""} instructor={""}/></Td>
                        <Td><MyModal id={item.id} first_name={item.first_name} last_name={item.last_name} personal_id={item.personal_id} tel={item.tel} address={item.address} signature={`${signature}`} data_of_birth={item.data_of_birth} course_id={0} email={""} instructor={""}/></Td>
                    </Tr>)} 
                </Tbody>
            </Table>
            </TableContainer>
            
			
        </div>
    );
}

export default ListInstructor;
