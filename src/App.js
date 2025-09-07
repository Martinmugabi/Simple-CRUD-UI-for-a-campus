import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./components/StudentList";
import FacultyList from "./components/FacultyList";
import CourseList from "./components/CourseList";
import DepartmentList from "./components/DepartmentList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Header />}
      <div style={{ display: "flex" }}>
        {token && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/students" element={token ? <StudentList /> : <Navigate to="/login" />} />
            <Route path="/faculty" element={token ? <FacultyList /> : <Navigate to="/login" />} />
            <Route path="/courses" element={token ? <CourseList /> : <Navigate to="/login" />} />
            <Route path="/departments" element={token ? <DepartmentList /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
