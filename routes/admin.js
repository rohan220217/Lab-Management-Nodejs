const express = require('express');
const libController = require('../controllers/admin');

const router = express.Router();

router.get('/products',libController.getProducts);

router.post('/add-product', libController.postAddProduct);

router.get('/edit-product/:productId', libController.getEditProduct);

router.put('/edit-product/:productId', libController.putEditProduct);

router.delete('/delete-product/:productId', libController.postDeleteProduct);  

router.post('/cart/:productId', libController.postCart);

router.post('/return/:productId', libController.return);

module.exports = router;