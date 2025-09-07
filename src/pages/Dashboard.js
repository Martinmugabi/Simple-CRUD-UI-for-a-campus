import React from "react";
import DashboardCards from "../components/DashboardCards";
import StudentList from "../components/StudentList";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardCards />
      <StudentList />
    </div>
  );
}

export default Dashboard;
