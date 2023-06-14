var express = require('express');
var router = express.Router();
const {getUrl, createUrl, updateUrl ,findByTags, deleteUrl} = require('../controllers/UrlController');

router.get('/:id', getUrl);
router.get('/', findByTags); // param ?tags=a,b,c
router.post('/', createUrl);
router.put('/:id', updateUrl);
router.delete('/:id', deleteUrl);

module.exports = router;
