import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"
import {FormControl,FormLabel, Input, Button, Container,} from '@chakra-ui/react'
import { login } from "../../../store/student-state";
import { store } from "../../../store/store";
import "./addInstructor.css";
import Instructor from "../../../models/instructorModel";
import SignatureCanvas from "react-signature-canvas";


function AddInstructor(): JSX.Element {

    const {register, handleSubmit} = useForm<Instructor>();
    const navigat = useNavigate();
   
    const send = async (newInstructor:Instructor) =>{
        newInstructor.signature = signature;

        const url = "http://localhost:3001/instructor/add";
        await axios.post(url, newInstructor)
        .catch(error =>{console.log(error);});
        navigat("/ListInstructor");
    }

    // ----this is handle signature-----
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
        <div className="addInstructor">

        <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
        <form onSubmit={handleSubmit(send)}>
            <FormControl isRequired>

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

            <FormLabel>license_number</FormLabel>
            <Input mb={4} {...register("license_number")} placeholder='license_number' />

            <FormLabel>years_of_experience</FormLabel>
            <Input mb={4} {...register("years_of_experience")} placeholder='license_number' />
            
            <Input mt={4} {...register("license_exp_date")} placeholder="license_exp_date"size="md" type="datetime-local"/>

            <p>signHere  <button onClick={clearSignatureCanvas}>🧹</button> </p>

            <SignatureCanvas ref={padRef}canvasProps={{width: 415, height: 200}}/> 

            </FormControl>
            <Button mt={4} mb={4} onClick={handleGetCanvas} colorScheme='teal' type='submit'> Submit</Button>
        </form>
        </Container>
			
        </div>
    );
}

export default AddInstructor;
