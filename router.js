const express = require('express');
const router = express.Router();
const storeController = require('./controller/storeController');
const productController = require('./controller/productController');
const { catchErrors } = require('./errorHandlers');

router.get('/', storeController.homePage);
router.get('/store', catchErrors(storeController.storeList));
router.get('/store/add', storeController.addStore);
router.post('/store/add',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));
router.get('/store/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', storeController.storeDetails);

router.get('/tags', storeController.getStoresbyTags);
router.get('/tags/:tag', storeController.getStoresbyTags);


module.exports = router;