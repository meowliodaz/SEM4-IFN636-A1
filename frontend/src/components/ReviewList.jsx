import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useEffect, useState } from 'react';

const ReviewList = ({ game, reviews, setReviews, reviewers }) => {
	const { user } = useAuth();

	return (
		<div>
			{reviews.map((review) => {
				var reviewer = {
					_id: '',
					name: 'John Doe'
				};
				for (var i=0; i < reviewers.length; i++) {
					if (!reviewer[i]) break;
					if (! typeof reviewer[i] === Object) break;
					
					if (reviewer[i]._id == review.userId) {
						reviewer = reviewer[i];
						break;
					}
				}
				return (<div key={review._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
					<div className="flex items-end">
						<h2 className="font-bold">{reviewer.name}</h2>
						<h4>&nbsp; {review.recommended ? "Recommended" : "Not recommended"}</h4>
					</div>
					<p>{review.description}</p>
					<div className="mt-2">
						<button
							className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
						>
							Upvote
						</button>
						<button
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Downvote
						</button>
					</div>
				</div>
			)})
			}
		</div>
	);
};

export default ReviewList;
