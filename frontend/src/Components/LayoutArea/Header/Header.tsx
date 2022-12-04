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
            <NavLink className="myPages" to="/ListStudents">ListStudents</NavLink>
            <span> | </span>           
            <NavLink className="myPages" to="/AddStudent">AddStudent</NavLink>
            <br/>
            <Divider boxShadow='dark-lg' mt="1rem" orientation='horizontal' />
        </div>
    );
}

export default Header;
