const express = require('express');
const StoreController = require('../controllers/StoreController');
const token = require('../middleware/token');
const router = express.Router();

router.get('/', StoreController.getStore);
router.get('/:id', StoreController.getStoreById);
router.post('/cart', StoreController.addCart);
router.post('/paymentstatus', StoreController.paymentStatus);

module.exports = router;