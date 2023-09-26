
const { REACT_APP_API_URL } = process.env;

const defaultBaseUrl = 'http://localhost:3001';

const API_BASE_URL = REACT_APP_API_URL || defaultBaseUrl;

export const API_URLS = {
  addCompany: `${API_BASE_URL}/company/add`,
  allCompany: `${API_BASE_URL}/company/allCompany`,
  addInstructor: `${API_BASE_URL}/instructor/add`,
  allInstructors: `${API_BASE_URL}/instructor/all`,
  addStudent: `${API_BASE_URL}/student/add`,
  allStudents: `${API_BASE_URL}/student/all`,
  studentPdf: `${API_BASE_URL}/student/pdf`,
  allCourses: `${API_BASE_URL}/student/allCourses`,
  instructor: `${API_BASE_URL}/instructor`,
  company: `${API_BASE_URL}/company`,
  base: API_BASE_URL,
  // Add more API URLs here as needed
};

export default API_URLS;