// Note:	This component is for displaying user's review on top of the review list
// 			like some sort of highlight


import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const YourReview = ({ review, setReview, userInfo }) => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleDelete = async (reviewId) => {
		const deleteConfirm = window.confirm(`Deleting review: ${reviewId}`);
		console.log(`deleteConfirm: [${deleteConfirm}] [${typeof deleteConfirm}]`);
		if (deleteConfirm) {
			const reviewDel = await axiosInstance.delete(`/api/reviews/${reviewId}`, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
		}
	};

	const goToEdit = () => {
		// navigate(`/reviews/${review.id}`);
		navigate(`/game/${review.gameId}/your-review`);
	};
	return (
		<div>
			<div className="bg-gray-100 p-4 mb-4 rounded shadow">
				<div className="flex items-end">
					<h2 className="font-bold">{userInfo.name}</h2>
					<h4>&nbsp; {review.recommended ? "Recommended" : "Not recommended"}</h4>
				</div>
				<p>{review.description}</p>
				<div className="mt-2">
					<button
						onClick={goToEdit}
						className="mr-2 bg-green-400 text-black font-semibold px-4 py-2 rounded"
					>
						Edit
					</button>
					<button
						onClick={() => handleDelete(review._id)}
						className="bg-red-400 text-black font-semibold px-4 py-2 rounded"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default YourReview;
