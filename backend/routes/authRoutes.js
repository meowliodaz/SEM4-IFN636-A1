
const express = require('express');
const { registerUser, loginUser, getProfile, getUsers, getUser, updateUser, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUsers)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.route('/:id').get(protect, getUser).put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
