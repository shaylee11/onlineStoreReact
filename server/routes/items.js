const express = require('express')
const router = express.Router()
const Product=require('../models/item')
const {addProduct, deleteProductById, getAllProducts, searchByName} = require("../controllers/item")
const { requireAuth } = require('../middleware/requireAuth')


// Post- Add Product

router.post('/AddProduct',addProduct)

// Put - Update Product נתיב לעדכון מוצר קיים

router.put('/UpdateProduct/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category, // עדכון קטגוריה אם נדרש
    };

    Product.findByIdAndUpdate(productId, updatedData, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        })
        .catch(err => res.status(500).json({ message: 'Error updating product', error: err }));
});


// Delete - נתיב למחיקת מוצר קיים

router.delete('/DeleteProduct/:id', deleteProductById);


// List - נתיב לקבלת רשימת מוצרים

router.get('/',requireAuth, getAllProducts);

router.get('/search',requireAuth, searchByName);

// Search - נתיב לחיפוש מוצרים לפי קטגוריה או מחיר
router.get('/SearchProducts', (req, res) => {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        filter.price = { $gte: minPrice };
    } else if (maxPrice) {
        filter.price = { $lte: maxPrice };
    }

    Product.find(filter)
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ message: 'Error fetching products', error: err }));
});

module.exports = router;