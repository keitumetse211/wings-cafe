import React, { useState, useEffect } from "react";

function Reporting() {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);

 
  const fetchData = async () => {
    const salesRes = await fetch("http://localhost:5000/sales");
    const salesData = await salesRes.json();
    setSales(salesData);

    const inventoryRes = await fetch("http://localhost:5000/inventory");
    const inventoryData = await inventoryRes.json();
    setInventory(inventoryData);

    const customersRes = await fetch("http://localhost:5000/customers");
    const customersData = await customersRes.json();
    setCustomers(customersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const totalSales = sales.reduce((acc, s) => acc + Number(s.amount), 0);
  const totalProducts = inventory.reduce((acc, p) => acc + Number(p.quantity), 0);
  const totalCustomers = customers.length;

  return (
    <div>
      <h1>Reporting Module</h1>
      <h3>Business Summary</h3>
      <ul>
        <li>Total Sales Amount: ${totalSales}</li>
        <li>Total Products in Stock: {totalProducts}</li>
        <li>Total Customers: {totalCustomers}</li>
      </ul>
    </div>
  );
}

export default Reporting;
