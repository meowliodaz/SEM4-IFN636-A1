
const express = require('express');
const { addReview, findReviews, getReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, findReviews).post(protect, addReview);
// router.route('/game/:gameid').get(protect, findReviews).post(protect, addReview);
// router.route('/user').get(protect, findUserReview);
// router.route('/user/game/:gameid').get(protect, findUserReview);
router.route('/:id').get(protect, getReview).put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
