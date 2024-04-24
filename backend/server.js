// Backend - server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brokentoothbakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Model for Bakery Items
const bakeryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

const BakeryItem = mongoose.model('BakeryItem', bakeryItemSchema);

// Seed Data
const seedItems = [
  { name: "Oatmeal Raisin", price: 2.50, description: "Classic oatmeal raisin cookies with a chewy texture." },
  { name: "Chocolate Chip", price: 2.00, description: "Delicious cookies loaded with chocolate chips." },
  { name: "Red Velvet", price: 2.75, description: "Rich red velvet cookies with white chocolate chunks." },
  { name: "Sugar Cookie", price: 1.50, description: "Sweet and buttery sugar cookies, perfect for any occasion." },
  { name: "Butter Pecan", price: 3.00, description: "Buttery cookies with crunchy pecans, a true delight." },
  { name: "White Chocolate Macadamia Nut", price: 3.25, description: "Luxurious white chocolate with macadamia nuts." },
  { name: "Snickerdoodle", price: 2.00, description: "Soft cookies coated with cinnamon sugar." },
  { name: "Peanut Butter Cookie", price: 2.00, description: "Creamy peanut butter cookies, chewy and delicious." },
  { name: "Shortbread Cookies", price: 2.50, description: "Crisp and buttery shortbread cookies." },
  { name: "Black & White Cookies", price: 2.75, description: "Iconic half chocolate, half vanilla icing on a soft cookie." }
];

BakeryItem.countDocuments((err, count) => {
  if (!count) {
    BakeryItem.insertMany(seedItems);
  }
});

// Routes
app.get('/api/items', async (req, res) => {
  const items = await BakeryItem.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new BakeryItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
