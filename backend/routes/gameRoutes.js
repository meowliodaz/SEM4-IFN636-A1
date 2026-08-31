
const express = require('express');
const { addGame, findGames, getGame, updateGame, deleteGame } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, findGames).post(protect, addGame);
router.route('/:id').get(protect, getGame).put(protect, updateGame).delete(protect, deleteGame);

module.exports = router;
