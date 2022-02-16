const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');


// Endpoints
router.get('/',homeController.home);
router.post('/delete',homeController.removeItems);
router.post('/addTask',homeController.addItem);

module.exports = router;