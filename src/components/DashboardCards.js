import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function DashboardCards() {
  const [counts, setCounts] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    departments: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, facultyRes, coursesRes, departmentsRes] = await Promise.all([
          API.get("/students"),
          API.get("/faculty"),
          API.get("/courses"),
          API.get("/departments")
        ]);
        setCounts({
          students: studentsRes.data.length,
          faculty: facultyRes.data.length,
          courses: coursesRes.data.length,
          departments: departmentsRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="card" onClick={() => navigate("/students")} style={{ cursor: "pointer" }}>Students: {counts.students}</div>
      <div className="card" onClick={() => navigate("/faculty")} style={{ cursor: "pointer" }}>Faculty: {counts.faculty}</div>
      <div className="card" onClick={() => navigate("/courses")} style={{ cursor: "pointer" }}>Courses: {counts.courses}</div>
      <div className="card" onClick={() => navigate("/departments")} style={{ cursor: "pointer" }}>Departments: {counts.departments}</div>
    </div>
  );
}

export default DashboardCards;
