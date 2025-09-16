import React, { useState, useEffect } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  
  const fetchInventory = async () => {
    const res = await fetch("http://localhost:5000/inventory");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

 
  const addProduct = async () => {
    if (!name || !quantity) return;
    const product = { name, quantity: parseInt(quantity) };
    await fetch("http://localhost:5000/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setName("");
    setQuantity("");
    fetchInventory();
  };

  
  const updateStock = async (index, change) => {
    const updatedProduct = { ...products[index] };
    updatedProduct.quantity += change;
    if (updatedProduct.quantity < 0) updatedProduct.quantity = 0;

    await fetch(`http://localhost:5000/inventory/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    fetchInventory();
  };

 
  const deleteProduct = async (index) => {
    await fetch(`http://localhost:5000/inventory/${index}`, { method: "DELETE" });
    fetchInventory();
  };

  return (
    <div>
      <h1>Inventory Module</h1>

      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>

      <h3>Products List</h3>
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} — {p.quantity}
            <button onClick={() => updateStock(index, 1)}>+ Add Stock</button>
            <button onClick={() => updateStock(index, -1)}>- Deduct Stock</button>
            <button onClick={() => deleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
