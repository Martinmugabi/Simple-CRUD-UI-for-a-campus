import React, { useState, useEffect } from "react";
import API from "../services/api";

function StudentForm({ editStudent, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [level, setLevel] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get("/departments").then(res => setDepartments(res.data));
    if (editStudent) {
      setName(editStudent.User?.name);
      setEmail(editStudent.User?.email);
      setRegistrationNumber(editStudent.registrationNumber);
      setLevel(editStudent.level);
      setDepartmentId(editStudent.departmentId);
    }
  }, [editStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudent) {
        await API.put(`/students/${editStudent.id}`, { name, email, registrationNumber, level, departmentId });
      } else {
        await API.post("/students", { name, email, registrationNumber, level, departmentId });
      }
      onSuccess();
      setName(""); setEmail(""); setRegistrationNumber(""); setLevel(""); setDepartmentId("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editStudent ? "Edit Student" : "Add Student"}</h3>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="Registration Number" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} required />
      <input type="text" placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} required />
      <select value={departmentId} onChange={e => setDepartmentId(e.target.value)} required>
        <option value="">Select Department</option>
        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <button type="submit">{editStudent ? "Update" : "Add"}</button>
    </form>
  );
}

export default StudentForm;
