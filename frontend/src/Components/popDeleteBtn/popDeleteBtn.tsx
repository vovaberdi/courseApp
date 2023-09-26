import "./popDeleteBtn.css";
import { useDisclosure, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup } from "@chakra-ui/react";
import Student from "../../models/studentModal";
import axios from "axios";
import { store } from "../../store/store";
import { login } from "../../store/student-state";
import API_URLS from "../../config";




  function PopDeleteBtn(props: {
    id: number;
    itemType: 'student' | 'course' | 'instructor' | 'company';
    onDelete: () => void; // Define onDelete prop type
  }): JSX.Element {
    const { isOpen, onToggle, onClose } = useDisclosure()
    // setStudent(student.filter(singleStudent => singleStudent.id !== id))
    const { id, itemType } = props;

    const urls = {
      student: `${API_URLS.base}/student/${id}`,
      course: `${API_URLS.base}/course/${id}`,
      instructor: `${API_URLS.base}/instructor/${id}`,
      company: `${API_URLS.base}/company/${id}`,
    };
  
    const url = urls[itemType as 'student' | 'course' | 'instructor' | 'company'];
  
    const deleteId = (id:any) => {
      store.dispatch(login(id));

         axios.delete(url)
        .then((response) => { 
            props.onDelete();
        
        }).catch((error) => {console.log("error", error);});
    }


    return (
        <div className="popDeleteBtn">

      <>
      <Button mr={5} onClick={onToggle}>
      ❌
      </Button>
      <Popover returnFocusOnClose={false}isOpen={isOpen}onClose={onClose}placement='right'closeOnBlur={false}>
        <PopoverTrigger>
        
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete?
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button variant='outline'>Cancel</Button>
              <Button onClick={()=>{deleteId(props.id)}} colorScheme='red'>Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
        </PopoverTrigger>
      </Popover>
    </>
			
        </div>
    );
}

export default PopDeleteBtn;
