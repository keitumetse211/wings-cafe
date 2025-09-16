import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Sales from "./components/Sales";
import Inventory from "./components/Inventory";
import Customer from "./components/Customer";
import Reporting from "./components/Reporting";
import "./App.css";

function App() {
  const [active, setActive] = useState("Sales");

  
  let content;
  if (active === "Sales") content = <Sales />;
  else if (active === "Inventory") content = <Inventory />;
  else if (active === "Customer") content = <Customer />;
  else if (active === "Reporting") content = <Reporting />;

  return (
    <div className="app">
      <Sidebar setActive={setActive} />
      <div className="content">{content}</div>
    </div>
  );
}

export default App;
