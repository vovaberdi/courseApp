import { Routes, Route } from "react-router-dom";
import AddInstructor from "../../Pages/addInstructor/addInstructor";
import AddStudent from "../../Pages/AddStudent/AddStudent";
import Home from "../../Pages/Home/Home";
import ListStudents from "../../Pages/ListCustomer/ListStudents";
import ListInstructor from "../../Pages/listInstructor/listInstructor";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import "./Main.css";
import AddCompany from "../../Pages/addCompany/addCompany";
import CompanyList from "../../Pages/companyList/companyList";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/AddStudent" element={<AddStudent />} />
                <Route path="/AddInstructor" element={<AddInstructor />} />
                <Route path="/AddCompany" element={<AddCompany />} />
                <Route path="/ListInstructor" element={<ListInstructor />} />
                <Route path="/ListStudents" element={<ListStudents />} />
                <Route path="/CompanyList" element={<CompanyList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Main;
