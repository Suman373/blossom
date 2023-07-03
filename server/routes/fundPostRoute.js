const express = require('express');
const router = express.Router();
const {getFundPosts, getOneFundPost, 
    addFundPost, updateFundPost, donateFund, deleteFundPost} = require('../controllers/fundPostController');

// get all fundraise posts
router.get('/', getFundPosts);
// get one fundraise post
router.get('/:id',getOneFundPost);
// add a fund post
router.post('/', addFundPost);
// update a fundraise post
router.put('/:id', updateFundPost);
// donation to a fundraise
router.put('/donate/fundraise/:id',donateFund);
// delete a fund post
router.delete('/:id', deleteFundPost);

module.exports = router;