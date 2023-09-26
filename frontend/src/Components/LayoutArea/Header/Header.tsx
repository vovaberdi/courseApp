import "./Header.css";
import { NavLink } from "react-router-dom";
import { Button, Divider, IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";




function Header(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div className="Header">
            <IconButton aria-label="toggle theme"rounded="full"size="xs"position="absolute"left={10}onClick={toggleColorMode}icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} />
            
            <NavLink className="myPages" to="/">Home</NavLink>
            <span> | </span>
            <NavLink className="myPages" to="/ListStudents">StudentsList</NavLink>
            <span> | </span>           
            <NavLink className="myPages" to="/AddStudent">AddStudent</NavLink>
            <span> | </span>           
            <NavLink className="myPages" to="/AddInstructor">AddInstructor</NavLink>
            <span> | </span>           
            <NavLink className="myPages" to="/ListInstructor">InstructorsList</NavLink>
            <span> | </span> 
            <NavLink className="myPages" to="/AddCompany">AddCompany</NavLink>
            <span> | </span>              
            <NavLink className="myPages" to="/CompanyList">CompanyList</NavLink>
            <br/>
            <Divider boxShadow='dark-lg' mt="1rem" orientation='horizontal' />
        </div>
    );
}

export default Header;
