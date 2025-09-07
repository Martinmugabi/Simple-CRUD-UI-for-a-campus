import React, { useEffect, useState } from "react";
import API from "../services/api";
import StudentForm from "./StudentForm";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [search, setSearch] = useState("");

  const fetchStudents = () => API.get("/students").then(res => setStudents(res.data));

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  const filteredStudents = students.filter(s =>
    s.User?.name.toLowerCase().includes(search.toLowerCase()) ||
    s.User?.email.toLowerCase().includes(search.toLowerCase()) ||
    s.registrationNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <StudentForm editStudent={editStudent} onSuccess={() => { fetchStudents(); setEditStudent(null); }} />
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Reg No</th><th>Level</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.User?.name}</td>
              <td>{s.User?.email}</td>
              <td>{s.registrationNumber}</td>
              <td>{s.level}</td>
              <td>
                <button onClick={() => setEditStudent(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
