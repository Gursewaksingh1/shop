const express = require('express');
const axios = require('axios')
const conn = require('../connection');
const router = express.Router();
router.get('/',(req, res) => {
   res.render('index')
});
router.post('/', (req, res) => {   
   
})
module.exports = router;