
const Game = require('../models/Game');
const Review = require('../models/Review');

// Add a new review
const addReview = async (req, res) => {
	const userId = req.user.id;
	const { gameId, recommended, description } = req.body;
	try {
		const reviewExists = await Review.findOne({ userId: userId, gameId: gameId });
		if (reviewExists) return res.status(400).json({ message: 'You already reviewed this game!' });

		const review = await Review.create({ userId: userId, gameId: gameId, recommended: recommended, description: description });
		res.status(201).json(review);
	} catch (error) {
		// console.log("[log] addReview: x");
		// console.log(error);
		res.status(500).json({ message: error.message });
	}
};

// Find reviews of a game
const findReviews = async (req, res) => {
	const gameId = req.query.game;
	const userId = req.user.id;
	const findByUser = Number(req.query.user) ? true : false;
	console.log("\n [log] findReviews 0");
	console.log("gameId: " + gameId);
	console.log("userId: " + userId);
	if (findByUser) {
		// Find user review (one)
		try {
			// console.log("\n [log] findBy User 1");
			
			const game = await Game.findById(gameId);
			// console.log(game);
			if (!game) {
				// console.log("\n [log] findBy User 2");
				return res.status(204).json({ message: `Game not found!` });
			}
			const review = await Review.findOne({ gameId: gameId, userId: userId });
			if (!review) {
				// console.log("\n [log] findBy User 3");
				return res.status(204).json({ message: `Review not found!` });
			}
			// const reviews = await Review.find({ userId: userId });

			// console.log("\n [log] findBy User 3");

			res.json(review);
		} catch (error) {
			console.log("\n [log] findBy User 4");
			console.log(error);

			res.status(500).json({ message: 'Server error!', error: error.message });
		}

	} else {
		// Find all reviews on a game
		try {
			console.log("\n [log] findBy Game 1");
			const game = await Game.findById(gameId);
			console.log(game);
			if (!game) {
				// console.log("\n [log] findBy Game 1.5");
				return res.status(204).json({ message: `Game not found!` });
			}
	
			// console.log("\n [log] findBy Game 2");
			// console.log(game);
	
			const reviews = await Review.find({ gameId: gameId });
	
			console.log("\n [log] findBy Game 3");
			console.log(reviews);
	
			res.json(reviews);
		} catch (error) {
			console.log("\n [log] findBy Game 4");
			console.log(error);
			res.status(500).json({ message: 'Server error!', error: error.message });
		}
	}
};

// Get review
const getReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(204).json({ message: `Review not found!` });
		}

		res.json(review);
	} catch (error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}
};

// Update review
const updateReview = async (req, res) => {
	console.log("[log] updateReview: 1");
	const { recommended, description } = req.body;
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(204).json({ message: `Review not found!` });
		}
		console.log("[log] updateReview: 2");
		console.log(review);

		review.recommended = (typeof recommended == Boolean) ? recommended : review.recommended;
		review.description = description || review.description;

		const updatedReview = await review.save();
		res.json(updatedReview);
	}
	catch(error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}
};

// Delete review
const deleteReview = async (req, res) => {
	// console.log("\n [log] deleteReview 0");
	try {
		const review = await Review.findById(req.params.id);
		// console.log("\n [log] deleteReview 1");

		if (!review) {
			return res.status(204).json({ message: `Review not found!` });
		}

		// console.log("\n [log] deleteReview 2");
		await review.remove();

		// console.log("\n [log] deleteReview 3");
		res.json({ message: 'Review deleted', deleted_review_data: review});
	}
	catch(error) {
		res.status(500).json({ message: 'Server error!', error: error.message });
	}

};

module.exports = { addReview, findReviews, getReview, updateReview, deleteReview };
