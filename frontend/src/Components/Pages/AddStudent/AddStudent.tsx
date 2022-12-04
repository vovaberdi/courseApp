import "./AddStudent.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"
import {FormControl,FormLabel,FormErrorMessage,FormHelperText, Input, Button, Container, Stack, RadioGroup, Radio, Select, Textarea,} from '@chakra-ui/react'
import Course from "../../../models/partsModal";
import Signature from "../../Signature/Signature";
import { login } from "../../../store/student-state";
import { store } from "../../../store/store";
import Student from "../../../models/studentModal";

function AddStudent(): JSX.Element {


    const [course, setCourses] = useState<Course[]>([]);

    const {register, handleSubmit} = useForm<Student>();
    const navigat = useNavigate();
   
    const send = async (newStudent:Student) =>{
        const url = "http://localhost:3001/student/add";
        await axios.post(url, newStudent)
        .catch(error =>{console.log(error);});

        // store.dispatch(login(newStudent));
        // localStorage.setItem("student", JSON.stringify(newStudent));
        navigat("/ListStudents");
    }

    useEffect(()=>{
        const url = "http://localhost:3001/student/allCourses";
        axios.get(url)
        .then((response)=>{
            setCourses(response.data);
        }).catch(error=>{console.log(error)});
    },[])
    

    return (
        <div className="AddCustomer">
            <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
            <form onSubmit={handleSubmit(send)}>
            <FormControl isRequired>

            <Select {...register("course_id")}  isRequired mt="4rem" placeholder='Select course'>
            {course.map((item, i) => (
            <option key={i}value={item.id}>{item.name}</option>))}
            </Select>

            <FormLabel>first_name</FormLabel>
            <Input {...register("first_name")} placeholder='first_name' />

            <FormLabel>last_name</FormLabel>
            <Input {...register("last_name")} placeholder='last_name' />

            <FormLabel>personal_id</FormLabel>
            <Input {...register("personal_id")} placeholder='personal_id' />

            <Input mt={4} {...register("data_of_birth")} placeholder="data_of_birth"size="md" type="datetime-local"/>

            <FormLabel>tel</FormLabel>
            <Input {...register("tel")} placeholder='tel' />

            <FormLabel>address</FormLabel>
            <Input {...register("address")} placeholder='address' />

            <FormLabel>email</FormLabel>
            <Input mb={4} {...register("email")} placeholder='email' />
            <p>signature</p>
            <Signature {...register} />

            </FormControl>
            <Button mt={4} mb={4} colorScheme='teal' type='submit'> Submit</Button>
          </form>
          </Container>
        </div>
        
    );
}

export default AddStudent;





