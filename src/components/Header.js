import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <h2>Kampala University</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
