const express = require('express');
const router = express.Router();
const storeController = require('./controller/storeController')
const { catchErrors } = require('./errorHandlers');

router.get('/', storeController.homePage);
router.get('/store', catchErrors(storeController.storeList));
router.get('/store/add', storeController.addStore);
router.post('/store/add', catchErrors(storeController.createStore));

module.exports = router;