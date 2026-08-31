
const Game = require('../models/Game');

// Add a new game
const addGame = async (req, res) => {
	const { title, description } = req.body;
	try {
		const gameExists = await Game.findOne({ title: title });
		if (gameExists) return res.status(400).json({ message: 'Game already exists!' });

		const game = await Game.create({ title, description });
		res.status(201).json({ id: game.id, name: game.title, email: game.description });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Find games
const findGames = async (req, res) => {
	const { search_string } = req.body;
	try {
		const games = await Game.find({ title: { "$regex": search_string, "$options": "i" } });

		res.json(games);
	} catch (error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}
};

// Get game
const getGame = async (req, res) => {
	try {
		const game = await Game.findById(req.params.id);

		if (!game) {
			return res.status(404).json({ message: `Game not found` });
		}

		res.json(game);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error!', error: error.message });
	}
};

// Update game
const updateGame = async (req, res) => {
	const { title, description } = req.body;
	try {
		const game = await Game.findById(req.params.id);

		if (!game) {
			return res.status(404).json({ message: `Game not found` });
		}

		game.title = title || game.title;
		game.description = description || game.description;

		const updatedGame = await game.save();
		res.json(updatedGame);
	}
	catch(error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}
};

// Delete game
const deleteGame = async (req, res) => {
	try {
		const game = await Game.findById(req.params.id);

		if (!game) {
			return res.status(404).json({ message: `Game not found` });
		}

		await game.remove();

		res.json({ message: 'Game deleted', deleted_game_data: game});
	}
	catch(error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}

};

module.exports = { addGame, findGames, getGame, updateGame, deleteGame };
