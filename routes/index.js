var express = require('express');
var router = express.Router();
let { showPage, uploadImage } = require('../controller/controller')
const path = require('path');
const fs = require('fs');
/* GET home page. */


router.get('/', showPage);

router.post('/', uploadImage);

module.exports = router;
