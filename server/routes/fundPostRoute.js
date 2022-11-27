const express = require('express');
const router = express.Router();
const {getFundPosts, addFundPost, deleteFundPost} = require('../controllers/fundPostController');

// viewing the fund posts
router.get('/', getFundPosts);

// add a fund post
router.post('/', addFundPost);

// delete a fund post
router.delete('/:id', deleteFundPost);

module.exports = router;