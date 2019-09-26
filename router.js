const express = require('express');
const router = express.Router();
const storeController = require('./controller/storeController');
const productController = require('./controller/productController');
const { catchErrors } = require('./errorHandlers');

router.get('/', storeController.homePage);
router.get('/store', catchErrors(storeController.storeList));
router.get('/store/add', storeController.addStore);
router.post('/store/add', catchErrors(storeController.createStore));
router.get('/store/:id/edit', catchErrors(storeController.editStore));

router.get('/product-list', catchErrors(productController.productList));
router.get('/addproduct', productController.addProduct);
router.post('/product/add', productController.createProduct);

module.exports = router;