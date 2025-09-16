import React from "react";

function Sidebar({ setActive }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => setActive("Sales")}>Sales</li>
        <li onClick={() => setActive("Inventory")}>Inventory</li>
        <li onClick={() => setActive("Customer")}>Customer</li>
        <li onClick={() => setActive("Reporting")}>Reporting</li>
      </ul>
    </div>
  );
}

export default Sidebar;
