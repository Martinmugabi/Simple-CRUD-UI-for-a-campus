import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/students">Students</NavLink></li>
        <li><NavLink to="/faculty">Faculty</NavLink></li>
        <li><NavLink to="/courses">Courses</NavLink></li>
        <li><NavLink to="/departments">Departments</NavLink></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
