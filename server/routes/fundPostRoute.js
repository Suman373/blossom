const express = require('express');
const router = express.Router();
const {getFundPosts, addFundPost, deleteFundPost} = require('../controllers/fundPostController');

// get all fundraise posts
router.get('/', getFundPosts);
// get one fundraise post
router.get('/:id',);
// add a fund post
router.post('/', addFundPost);
// update a fund post
router.put('/:id');
// donation to a fundraise
router.put('/donate/fundraise/:id');
// delete a fund post
router.delete('/:id', deleteFundPost);

module.exports = router;