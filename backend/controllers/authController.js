
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register - Create user
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) return res.status(400).json({ message: 'User already exists' });

		const user = await User.create({ name, email, password });
		res.status(201).json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
		} else {
			res.status(401).json({ message: 'Invalid email or password' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user info
const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
			university: user.university,
			address: user.address,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Get users
const getUsers = async (req, res) => {
	var info = true;
	if (req.query.info) {
		if (Number(req.query.info) === 0) info = false
	}
	try {
		const users = await User.find();
		if (!users) return res.status(404).json({ message: "User not found!"});

		if (info) {
			var userList = [];
			users.forEach((user) => {
				userList.push({
					_id: user._id,
					name: user.name
				})
			});
			console.log('[log] User');
			console.log(userList);

			res.status(200).json(userList);
		}
		else {
			res.status(200).json(users);

		}
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Get user by id
const getUser = async (req, res) => {
	var info = true;
	if (req.query.info) {
		if (Number(req.query.info) === 0) info = false
	}
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found!"});

		if (info)
			res.status(200).json({
				name: user.name
			});
		else
			res.status(200).json(user);

	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Update user
const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(204).json({ message: 'User not found' });

		const { name, email, university, address } = req.body;
		user.name = name || user.name;
		user.email = email || user.email;
		user.university = university || user.university;
		user.address = address || user.address;

		const updatedUser = await user.save();
		res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, university: updatedUser.university, address: updatedUser.address, token: generateToken(updatedUser.id) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete user
const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(204).json({ message: 'User not found' });

		await user.remove();

		res.json({ message: 'User deleted'});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


module.exports = { registerUser, loginUser, getProfile, getUser, getUsers, updateUser, deleteUser };
