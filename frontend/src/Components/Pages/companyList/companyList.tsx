import "./companyList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { MyModal } from "../../popModal/popModal";
import { store } from "../../../store/store";
import PopDeleteBtn from "../../popDeleteBtn/popDeleteBtn";
import Company from "../../../models/companyModel";
import API_URLS from "../../../config";

function CompanyList(): JSX.Element {

    const [company, setCompany] = useState<Company[]>([]);


    const handleDeleteCompany = (compId: number) => {
        console.log(compId);
        setCompany(prevCompany => prevCompany.filter(item => item.id !== compId));
    };

    useEffect(() => {
         const url = API_URLS.allCompany;
         axios.get(url)
        .then((response) => {

            setCompany(response.data);

        }).catch((error) => {console.log("error", error);});
    }, []);

        // setStudent(student.filter(singleStudent => singleStudent.id !== id))


    return (
        <div className="listInstructor">


<TableContainer  maxWidth="100%" align-self="center" rounded='md' boxShadow='dark-lg'>
                <Table size='sm' variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>first_name</Th>
                        <Th>last_name</Th>
                        <Th>personal_id</Th>
                        <Th>factory_name</Th>
                        <Th>tel</Th>
                        <Th>address</Th>
                        <Th>postal_code</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {company.map(item=><Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.personal_id}</Td>
                        <Td>{item.factory_name}</Td>
                        <Td>{item.tel}</Td>
                        <Td>{item.address}</Td>
                        <Td>{item.postal_code}</Td>
                        <Td><PopDeleteBtn itemType="company" id={item.id} onDelete={() => handleDeleteCompany(item.id)}/></Td>
                    </Tr>)} 
                </Tbody>
            </Table>
            </TableContainer>
            
			
        </div>
    );
}

export default CompanyList;
