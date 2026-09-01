import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import YourReview from '../components/YourReview';
import ReviewList from '../components/ReviewList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Game = () => {
	const navigate = useNavigate();

	const { user } = useAuth();
	const [userInfo, setUserInfo] = useState({});
	const [game, setGame] = useState({});
	const [yourReview, setYourReview] = useState({});
	const [reviews, setReviews] = useState([]);
	const [reviewers, setReviewers] = useState([]);

	const urlArr = window.location.href.split("/");
	const gameID = urlArr[urlArr.length - 1];

	useEffect(() => {
		const fetchGame = async () => {
			try {
				const gameRes = await axiosInstance.get(`/api/games/${gameID}`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setGame(gameRes.data);

			} catch (error) {
				alert("1 \n" + error);
			}
			
			try {
				const userReviewRes = await axiosInstance.get(`/api/reviews?game=${gameID}&user=1`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setYourReview(userReviewRes.data);
				
				console.log("yourReview");
				console.log(userReviewRes);
				console.log(yourReview);
			} catch (error) {
				alert("2 \n" + error);
			}
			
			try {
				const reviewsRes = await axiosInstance.get(`/api/reviews?game=${gameID}&user=0`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setReviews(reviewsRes.data);
				// console.log("reviews");
				// console.log(reviewsRes.data);
				 
			} catch (error) {
				alert("3 \n" + error);
			}
			
			try {
				const userRes = await axiosInstance.get(`/api/auth/profile`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setUserInfo(userRes.data);
				// console.log(userRes.data);
			} catch (error) {
				alert("4 \n" + error);
			}
			
			try {
				const reviewersRes = await axiosInstance.get(`/api/auth/`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setReviewers(reviewersRes);
				
				// console.log("reviewers");
				// console.log(reviewers);
			} catch (error) {
				alert("5 \n" + error);
			}
		};

		fetchGame();
	}, [user]);

	
	// useEffect(() => {
	// 	console.log("yourReview");
	// 	console.log(yourReview);
	// 	// console.log("reviews");
	// 	// console.log(reviews);
	// 	// console.log("reviewers");
	// 	// console.log(reviewers);
	// },[yourReview])

	const navHome = () => {
		navigate("/home");
	};

	return (
		<div className="container mx-auto p-6">
			<div>
				<h1 className="font-bold">{game.title}</h1>
				<br />
				<p>{game.description}</p>
				<button
					onClick={navHome}
				>Home</button>

			</div>
			<div class="w-full border-solid border-2">
				
			</div>
			<YourReview
				review={yourReview}
				setReview={setYourReview}
				userInfo={userInfo}
				gameID={gameID}
			/>
			<ReviewList game={game} reviews={reviews} setReviews={setReviews} reviewers={reviewers}/>
		</div>
	);
};

export default Game;
