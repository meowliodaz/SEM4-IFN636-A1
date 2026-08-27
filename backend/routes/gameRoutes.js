
const express = require('express');
const { getGames, addGame, updateGame, deleteGame } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getGames).post(protect, addGame);
router.route('/:id').put(protect, updateGame).delete(protect, deleteGame);

module.exports = router;
