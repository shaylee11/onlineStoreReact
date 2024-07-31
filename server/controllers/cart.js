const CartProduct = require("../models/cart");

async function addCartProduct(req, res) {
  const cartProduct = new CartProduct({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    userId: req.user._id,
  });

  try {
    const newCartProduct = await cartProduct.save();
    res
      .status(201)
      .json({ message: "new product created successfully", newCartProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProductById(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedProduct = await CartProduct.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(401).json({ message: "product not found" });

    const products = await CartProduct.find({ userId });

    res.status(200).json({
      message: "product deleted successfully",
      deletedProduct,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllMyCartProducts(req, res) {
  const userId = req.user._id;

  try {
    const products = await CartProduct.find({ userId });

    res
      .status(200)
      .json({ message: "products fetched successfully", products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function editCartProductQuantity(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const editedProduct = await CartProduct.findByIdAndUpdate(id, {
      quantity: req.body.quantity,
    });
    if (!editedProduct)
      return res.status(404).json({ message: "product not found" });

    const products = await CartProduct.find({userId});

    res
      .status(200)
      .json({ message: "products quantity changed successfully",editedProduct ,products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { addCartProduct, getAllMyCartProducts, deleteProductById, editCartProductQuantity };
