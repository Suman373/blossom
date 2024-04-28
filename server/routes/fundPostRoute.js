const express = require('express');
const router = express.Router();
const {getFundPosts, getOneFundPost, 
    addFundPost, updateFundPost, donateFund, deleteFundPost,
    getDonors} = require('../controllers/fundPostController');

// get all fundraise posts
router.get('/', getFundPosts);
// get one fundraise post
router.get('/:id',getOneFundPost);
// add a fundraise post
router.post('/', addFundPost);
// update a fundraise post
router.put('/:id', updateFundPost);
// delete a fundraise post
router.delete('/:id', deleteFundPost);
// get donors of fundraise post
router.get('/donors/:id', getDonors);
module.exports = router;