const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;