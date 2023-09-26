import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"
import {FormControl,FormLabel, Input, Button, Container,} from '@chakra-ui/react'
import "./addCompany.css";
import Company from "../../../models/companyModel";
import API_URLS from "../../../config";


function AddCompany(): JSX.Element {

    const {register, handleSubmit} = useForm<Company>();
    const navigate = useNavigate();
   
    const send = async (newCompany:Company) =>{
        const url = API_URLS.addCompany;
        await axios.post(url, newCompany)
        .catch(error =>{console.log(error);});
        navigate("/CompanyList");
    }
    

    return (
        <div className="addInstructor">

        <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
        <form onSubmit={handleSubmit(send)}>
            <FormControl isRequired>

            <FormLabel>first_name</FormLabel>
            <Input {...register("first_name")} placeholder='first_name' />

            <FormLabel>last_name</FormLabel>
            <Input {...register("last_name")} placeholder='last_name' />

            <FormLabel>factory_name</FormLabel>
            <Input {...register("factory_name")} placeholder='factory_name' />

            <FormLabel>personal_id</FormLabel>
            <Input {...register("personal_id")} placeholder='personal_id' />

            <FormLabel>postal_code</FormLabel>
            <Input {...register("postal_code")} placeholder='postal_code' />

            <FormLabel>tel</FormLabel>
            <Input {...register("tel")} placeholder='tel' />

            <FormLabel>address</FormLabel>
            <Input {...register("address")} placeholder='address' />
            
            </FormControl>
            <Button mt={4} mb={4} colorScheme='teal' type='submit'> Submit</Button>
        </form>
        </Container>
			
        </div>
    );
}

export default AddCompany;
