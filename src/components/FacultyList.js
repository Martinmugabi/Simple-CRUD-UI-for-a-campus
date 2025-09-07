import React, { useEffect, useState } from "react";
import API from "../services/api";
import FacultyForm from "./FacultyForm";

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [editFaculty, setEditFaculty] = useState(null);
  const [search, setSearch] = useState("");

  const fetchFaculty = () => API.get("/faculty").then(res => setFaculty(res.data));

  useEffect(() => { fetchFaculty(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/faculty/${id}`);
      fetchFaculty();
    }
  };

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <FacultyForm editFaculty={editFaculty} onSuccess={() => { fetchFaculty(); setEditFaculty(null); }} />
      <input
        type="text"
        placeholder="Search faculty..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculty.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>
                <button onClick={() => setEditFaculty(f)}>Edit</button>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyList;
