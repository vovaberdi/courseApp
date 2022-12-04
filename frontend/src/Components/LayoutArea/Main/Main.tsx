import { Routes, Route } from "react-router-dom";
import AddStudent from "../../Pages/AddStudent/AddStudent";
import Home from "../../Pages/Home/Home";
import ListStudents from "../../Pages/ListCustomer/ListStudents";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/AddStudent" element={<AddStudent />} />
                <Route path="/ListStudents" element={<ListStudents />} />
                <Route path="/Login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Main;
