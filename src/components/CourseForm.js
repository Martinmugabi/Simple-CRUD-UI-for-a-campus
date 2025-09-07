import React, { useState, useEffect } from "react";
import API from "../services/api";

function CourseForm({ editCourse, onSuccess }) {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get("/departments").then(res => setDepartments(res.data));
    if (editCourse) {
      setName(editCourse.name);
      setDepartmentId(editCourse.departmentId);
    }
  }, [editCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCourse) {
        await API.put(`/courses/${editCourse.id}`, { name, departmentId });
      } else {
        await API.post("/courses", { name, departmentId });
      }
      onSuccess();
      setName(""); setDepartmentId("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editCourse ? "Edit Course" : "Add Course"}</h3>
      <input type="text" placeholder="Course Name" value={name} onChange={e => setName(e.target.value)} required />
      <select value={departmentId} onChange={e => setDepartmentId(e.target.value)} required>
        <option value="">Select Department</option>
        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <button type="submit">{editCourse ? "Update" : "Add"}</button>
    </form>
  );
}

export default CourseForm;
