import "./AddStudent.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"
import {FormControl,FormLabel, Input, Button, Container, Select,} from '@chakra-ui/react'
import Course from "../../../models/partsModal";
import { login } from "../../../store/student-state";
import { store } from "../../../store/store";
import Student from "../../../models/studentModal";
import SignatureCanvas from "react-signature-canvas";
import Company from "../../../models/companyModel";
import API_URLS from "../../../config";


function AddStudent(): JSX.Element {


    const [course, setCourses] = useState<Course[]>([]);
    const [company, setCompany] = useState<Company[]>([]);
    const {register, handleSubmit} = useForm<Student>();
    const navigate = useNavigate();

   
    const send = async (newStudent:Student) =>{
        const url = API_URLS.addStudent;
        newStudent.signature = signature;
        await axios.post(url, newStudent).then((response)=>{console.log(response)})
        .catch(error =>{console.log(error);});
        navigate("/ListStudents");
    }

    useEffect(()=>{

        const url1 = API_URLS.allCourses;
        axios.get(url1)
        .then((response)=>{
            setCourses(response.data);
        }).catch(error=>{console.log(error)});

        const url2 = API_URLS.allCompany
        axios.get(url2)
        .then((response)=>{
            setCompany(response.data);
            console.log(company);
        }).catch(error=>{console.log(error)});

    },[])

// ----this handle signature-----
    const padRef = useRef(null) as React.MutableRefObject<any>;
    const [signature, setCanvas] = useState<string>('');
    const [canvasVisibility, setCanvasVisibility] = useState(false);

    const clearSignatureCanvas = useCallback(() => {
      padRef?.current?.clear();
      setCanvas('');
      setCanvasVisibility(false);
    }, []);
  
    const handleGetCanvas = useCallback(() => {
        
      const signature = (padRef?.current?.toDataURL());
      store.dispatch(login(signature))
    
      setCanvas(signature);
      setCanvasVisibility(true);
    }, []);

    

    return (
        <div className="AddCustomer">
            <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
            <form onSubmit={handleSubmit(send)}>
            <FormControl isRequired>

            <Select {...register("course_id")}  isRequired mt="4rem" placeholder='Select course'>
            {course.map((item, i) => (
            <option key={i}value={item.id}>{item.name}</option>))}
            </Select>

            <Select {...register("companyId")}  isRequired mt="1rem" placeholder='company'>
            {company.map((item, i) => (
            <option key={i}value={item.id}>{item.first_name}</option>))}
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
            <p>signHere  <button onClick={clearSignatureCanvas}>🧹</button> </p>

            <SignatureCanvas ref={padRef}canvasProps={{width: 415, height: 200}}/>

            </FormControl>
            <Button mt={4} onClick={handleGetCanvas} mb={4} colorScheme='teal' type='submit'> Submit</Button>
          </form>
          </Container>
        </div>
        
    );
}

export default AddStudent;





