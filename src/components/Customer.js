import React, { useState, useEffect } from "react";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

 
  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:5000/customers");
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  
  const addCustomer = async () => {
    if (!name || !email) return;
    const customer = { name, email };
    await fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    setName("");
    setEmail("");
    fetchCustomers();
  };

  return (
    <div>
      <h1>Customer Module</h1>

      <h3>Add Customer</h3>
      <input
        type="text"
        placeholder="Customer name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Customer email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addCustomer}>Add Customer</button>

      <h3>Customer List</h3>
      <ul>
        {customers.map((c, index) => (
          <li key={index}>
            {c.name} — {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customer;
