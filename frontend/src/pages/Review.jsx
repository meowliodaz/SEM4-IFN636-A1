// Note:	This page is for creating/editing a review

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
	const navigate = useNavigate();
	const gameId = useParams().id;
	const { user } = useAuth(); // Access user token from context
	const [formData, setFormData] = useState({
		_id: '',
		gameId: gameId,
		description: '',
		recommended: true
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Fetch profile data from the backend
		const fetchExistingReview = async () => {
			setLoading(true);

			const fetchURL = `/api/reviews?game=${gameId}&user=1`;
			const userReviewRes = await axiosInstance.get(fetchURL, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			if (userReviewRes.data) {
				console.log("Review exist!");
				setFormData({
					_id: userReviewRes.data._id ?? formData._id,
					description: userReviewRes.data.description ?? formData.description,
					recommended: userReviewRes.data.recommended ?? formData.recommended
				});
			}
			else console.log("No review yet~");

			setLoading(false);
		};

		if (user) fetchExistingReview();
		console.log(gameId);
	}, [user]);

	useEffect(() => {
		console.log("formData");
		console.log(formData._id);
		console.log(formData.recommended);
		console.log(formData.description);
	},[formData])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!formData._id) {
			// Create new review
			console.log("Form submitted: Create!");
			try {
				await axiosInstance.post(`/api/reviews`, formData, {
					headers: { Authorization: `Bearer ${user.token}` },
				})
				alert('Create review successfully!');
			} catch (error) {
				alert('Failed to post review! Reason:\n' + error);
			} finally {
				setLoading(false);
			}
		}
		else {
			// Update existing review
			console.log("Form submitted: Update!");
			console.log(formData._id);
			try {
				await axiosInstance.put(`/api/reviews/${formData._id}`, formData, {
					headers: { Authorization: `Bearer ${user.token}` },
				})
				alert('Update review successfully!');

			} catch (error) {
				alert('Failed to update review! Reason:\n' + error);
			} finally {
				setLoading(false);
			}

		}
	};

	// if (loading) {
	// 	return <div className="text-center mt-20">Loading...</div>;
	// }

	const refresh = async (e) => {
		console.log("Refresh!");
		console.log("gameId: " + gameId);
		try {
			const fetchURL = `/api/reviews?game=${gameId}&user=1`;
			const userReviewRes = await axiosInstance.get(fetchURL, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			if (userReviewRes.data) {
				console.log("Review exist!");
				setFormData({
					_id: userReviewRes.data._id ?? formData._id,
					description: userReviewRes.data.description ?? formData.description,
					recommended: userReviewRes.data.recommended ?? formData.recommended
				});
			}
			else console.log("No review yet~");

		} catch (error) {
			alert(error);
		}

	};

	const changeRecommended = (event) => {
		setFormData({ ...formData, recommended: event.target.checked })
	}

	return (
		<div className="max-w-md mx-auto mt-20">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={refresh}
			>Refresh</button>
			<form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
				<h1 className="text-2xl font-bold mb-4 text-center">Your Review</h1>
				<div className='flex'>
					<span className='font-semibold'>Recommended: </span>
					<input
						type="checkbox"
						checked={formData.recommended}
						onChange={changeRecommended}
						className="m-2 mb-4 p-2 border rounded"
					/>
				</div>
				<textarea
					placeholder="Your review..."
					rows="5"
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
					{loading ? 'Loading...' : ((!formData._id) ? 'Post Review' : 'Update Review')}
				</button>
			</form>
		</div>
	);
};

export default Profile;
