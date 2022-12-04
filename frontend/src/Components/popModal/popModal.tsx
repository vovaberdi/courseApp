import "./popModal.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import Student from "../../models/studentModal";
import { store } from "../../store/store";
import { useEffect, useState } from "react";
import { login } from "../../store/student-state";

  export function MyModal(props: Student) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [students, setCurrUser] = useState<Student>();


    // const students = store.getState().StudentState.student;

    // const getUser = async () => {
    //     if (localStorage.getItem("student")) {
    //       const loggedInUser = await JSON.parse(
    //         localStorage.getItem("student") as string 
    //         );
    //         setCurrUser(loggedInUser);
    //     }

    //   };
    
    //   useEffect(() => {
    //     getUser();
    //   }, [store.getState().StudentState.student]);
     
    
    return (
      <>
        <Button onClick={onOpen}>✅</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {props.id} <br /> <hr />
                {props.first_name}<br /> <hr />
                {props.last_name}<br /> <hr />
                {props.course_id}<br /> <hr />
                {props.personal_id}<br /> <hr />
                {(props.data_of_birth).toString().split('T')[0]}<br /> <hr />
                {props.tel}<br /> <hr />
                {props.address}<br /> <hr />
                {props.email}<br /> <hr /> 
                <img src={props.signature} /><br /> <hr /> 


            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }



