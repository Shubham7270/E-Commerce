const Product = require("../models/product");

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Add new product (admin only)
exports.addProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;

  const product = new Product({
    name,
    description,
    price,
    countInStock,
    imageUrl,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.imageUrl = imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
