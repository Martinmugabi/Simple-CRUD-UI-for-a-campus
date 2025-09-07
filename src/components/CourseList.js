import React, { useEffect, useState } from "react";
import API from "../services/api";
import CourseForm from "./CourseForm";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCourses = () => API.get("/courses").then(res => setCourses(res.data));

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.department?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <CourseForm editCourse={editCourse} onSuccess={() => { fetchCourses(); setEditCourse(null); }} />
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.department?.name}</td>
              <td>
                <button onClick={() => setEditCourse(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
