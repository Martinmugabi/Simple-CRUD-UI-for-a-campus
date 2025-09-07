import React, { useState, useEffect } from "react";
import API from "../services/api";

function DepartmentForm({ editDepartment, onSuccess }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editDepartment) setName(editDepartment.name);
  }, [editDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDepartment) {
        await API.put(`/departments/${editDepartment.id}`, { name });
      } else {
        await API.post("/departments", { name });
      }
      onSuccess();
      setName("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editDepartment ? "Edit Department" : "Add Department"}</h3>
      <input type="text" placeholder="Department Name" value={name} onChange={e => setName(e.target.value)} required />
      <button type="submit">{editDepartment ? "Update" : "Add"}</button>
    </form>
  );
}

export default DepartmentForm;
