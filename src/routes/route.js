const express = require('express');
const uploadConfig = require('../config/upload');
const multer = require('multer');

const ImportTxtController = require('../controllers/ImportTxtController');

const routes = express.Router();

const upload = multer(uploadConfig.upload());

routes.post('/upload-txt',upload.single('file'), ImportTxtController.store);

module.exports = routes;