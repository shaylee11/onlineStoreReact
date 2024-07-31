const Product=require('../models/item')

async function addProduct(req, res) {
    const product = new Product({
      name: req.body.name,
      price:  req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    });

  try {
   const newProduct = await product.save();
   const productList = await Product.find({});
   res.status(201).json({message:"new product created successfully", newProduct,productList})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProductById(req, res) {
   const {id} = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) res.status(404).json({message:"product not found"})

   res.status(200).json({message:"product deleted successfully", deletedProduct})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllProducts(req, res) {
  const {category, minPrice,maxPrice} = req.query;

  const query = {};
  if(category) query.category = category;

  if(minPrice && maxPrice) {
    query.price = {$gte: Number(minPrice), $lte:Number(maxPrice)}
  }else if(minPrice) {
    query.price = {$gte: Number(minPrice)}
  }else if(maxPrice) {
    query.price = {$lte: Number(maxPrice)}
  }

  try {
    const products = await Product.find(query);

   res.status(200).json({message:"products fetched successfully", products})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function searchByName(req, res) {
  const {name} = req.query;

  try {
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });

   res.status(200).json({message:"products fetched successfully", products})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { addProduct,deleteProductById, getAllProducts, searchByName };
