const express = require('express');
const router = express.Router();
const storeController = require ('./controller/storeController')

router.get('/', storeController.homePage);

module.exports = router;