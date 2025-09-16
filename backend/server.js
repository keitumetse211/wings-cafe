const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;


const readJSON = (file) => JSON.parse(fs.readFileSync(`./data/${file}.json`));
const writeJSON = (file, data) => fs.writeFileSync(`./data/${file}.json`, JSON.stringify(data, null, 2));


app.get("/sales", (req, res) => {
  const sales = readJSON("sales");
  res.json(sales);
});

app.post("/sales", (req, res) => {
  const sales = readJSON("sales");
  sales.push(req.body);
  writeJSON("sales", sales);
  res.json({ success: true });
});


app.get("/inventory", (req, res) => {
  const inventory = readJSON("inventory");
  res.json(inventory);
});

app.post("/inventory", (req, res) => {
  const inventory = readJSON("inventory");
  inventory.push(req.body);
  writeJSON("inventory", inventory);
  res.json({ success: true });
});

app.put("/inventory/:index", (req, res) => {
  const inventory = readJSON("inventory");
  const i = parseInt(req.params.index);
  inventory[i] = req.body;
  writeJSON("inventory", inventory);
  res.json({ success: true });
});

app.delete("/inventory/:index", (req, res) => {
  const inventory = readJSON("inventory");
  const i = parseInt(req.params.index);
  inventory.splice(i, 1);
  writeJSON("inventory", inventory);
  res.json({ success: true });
});


app.get("/customers", (req, res) => {
  const customers = readJSON("customers");
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const customers = readJSON("customers");
  customers.push(req.body);
  writeJSON("customers", customers);
  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
