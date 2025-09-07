import React, { useState, useEffect } from "react";
import API from "../services/api";

function FacultyForm({ editFaculty, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editFaculty) {
      setName(editFaculty.name);
      setEmail(editFaculty.email);
    }
  }, [editFaculty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editFaculty) {
        await API.put(`/faculty/${editFaculty.id}`, { name, email });
      } else {
        await API.post("/faculty", { name, email });
      }
      onSuccess();
      setName(""); setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editFaculty ? "Edit Faculty" : "Add Faculty"}</h3>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">{editFaculty ? "Update" : "Add"}</button>
    </form>
  );
}

export default FacultyForm;
