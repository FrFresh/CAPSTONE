const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost/brokenToothBakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Middleware
app.use(bodyParser.json());

// Model: Product
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  category: String
}));

// Routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.send(newProduct);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));