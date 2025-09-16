import React, { useState, useEffect } from "react";

function Sales() {
  const [sales, setSales] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  
  const fetchSales = async () => {
    const res = await fetch("http://localhost:5000/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  
  const addSale = async () => {
    if (!product || !amount) return;
    const sale = { product, amount, date: new Date().toLocaleString() };
    await fetch("http://localhost:5000/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sale),
    });
    setProduct("");
    setAmount("");
    fetchSales(); 
  };

  return (
    <div>
      <h1>Sales Module</h1>

      <h3>Add Sale</h3>
      <input
        type="text"
        placeholder="Product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addSale}>Add Sale</button>

      <h3>Sales Records</h3>
      <ul>
        {sales.map((s, index) => (
          <li key={index}>
            {s.product} — M{s.amount} — {s.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sales;
