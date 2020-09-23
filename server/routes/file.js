const express = require('express');
const FileController = require('../controllers/FileController');
const router = express.Router();

router.post('/', FileController.uploadFile);

module.exports = router;