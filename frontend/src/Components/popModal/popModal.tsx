import "./popModal.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import Student from "../../models/studentModal";
import { store } from "../../store/store";
import { useEffect, useState } from "react";
import { login } from "../../store/student-state";
import Certification from "../certification/certification";
import React from "react";



  export function MyModal(props: Student) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = React.useState();
  
    const handleSizeClick = (newSize:any) => {
      setSize(newSize)
      onOpen()
    }
  
    const sizes = ['full']
     
    
    return (
      <>
      {sizes.map((size) => (
        <Button
          onClick={() => handleSizeClick(size)}
          key={size}
          m={4}
        >✅</Button>
      ))}

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Certification id={props.id} course_id={props.course_id} first_name={props.first_name} last_name={props.last_name} personal_id={props.personal_id} tel={props.tel} address={props.address} email={props.email} data_of_birth={props.data_of_birth} signature={props.signature} instructor={props.instructor} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      // <>
      //   <Button onClick={onOpen}>✅</Button>
  
      //   <Modal isOpen={isOpen} full onClose={onClose}>
      //     <ModalOverlay />
      //     <ModalContent>
      //       <ModalHeader>Modal Title</ModalHeader>
      //       <ModalCloseButton />
      //       <ModalBody>
                // {props.id} <br /> <hr />
                // {props.first_name}<br /> <hr />
                // {props.last_name}<br /> <hr />
                // {props.course_id}<br /> <hr />
                // {props.personal_id}<br /> <hr />
                // {(props.data_of_birth).toString().split('T')[0]}<br /> <hr />
                // {props.tel}<br /> <hr />
                // {props.address}<br /> <hr />
                // {props.email}<br /> <hr /> 
                // <img src={props.signature} /><br /> <hr /> 


      //       </ModalBody>
  
      //       <ModalFooter>
      //         <Button colorScheme='blue' mr={3} onClick={onClose}>
      //           Close
      //         </Button>
      //         <Button variant='ghost'><Certification/></Button>
      //       </ModalFooter>
      //     </ModalContent>
      //   </Modal>
      // </>
    )
  }



