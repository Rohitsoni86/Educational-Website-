import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppHome from "./pages/AppHome";
import CourseListing from "./pages/CourseListing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import StudentDetails from "./pages/StudentDetails";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/student" element={<AppHome />}>
          <Route
            index
            exact
            path="/student/home"
            element={<StudentDetails />}
          />
          <Route exact path="/student/dashboard" element={<Dashboard />} />
          <Route exact path="/student/courselist" element={<CourseListing />} />
          <Route
            exact
            path="/student/courselist/details/:id"
            element={<CourseDetails />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
