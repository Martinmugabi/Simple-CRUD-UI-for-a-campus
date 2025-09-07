import React, { useEffect, useState } from "react";
import API from "../services/api";
import DepartmentForm from "./DepartmentForm";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [editDepartment, setEditDepartment] = useState(null);
  const [search, setSearch] = useState("");

  const fetchDepartments = () => API.get("/departments").then(res => setDepartments(res.data));

  useEffect(() => { fetchDepartments(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/departments/${id}`);
      fetchDepartments();
    }
  };

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DepartmentForm editDepartment={editDepartment} onSuccess={() => { fetchDepartments(); setEditDepartment(null); }} />
      <input
        type="text"
        placeholder="Search departments..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>
                <button onClick={() => setEditDepartment(d)}>Edit</button>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
