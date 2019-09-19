const express = require('express');
const router = express.Router();
const storeController = require('./controller/storeController')

router.get('/', storeController.homePage);
router.get('/store', storeController.storeList);
router.get('/store/add', storeController.addStore);

module.exports = router;