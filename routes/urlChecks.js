var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/auth');
const idorPrevention = require('../middlewares/idor-prevention');

const {getUrl, getAllUrls, createUrl, updateUrl ,findByTags, deleteUrl} = require('../controllers/UrlController');

router.use(authMiddleware);
router.get('/:id', idorPrevention, getUrl);
router.get('/', getAllUrls); // param ?tags=a,b,c
router.post('/', createUrl);
router.put('/:id',idorPrevention, updateUrl);
router.delete('/:id',idorPrevention, deleteUrl);

module.exports = router;
