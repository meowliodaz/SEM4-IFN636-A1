import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const NewUser = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		university: '',
		address: '',
		permission: 'user',
		password: ''
	});
	
	
	const goToAdmin = async () => {
		navigate(`/admin/`);
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axiosInstance.post(`/api/auth/register`, formData, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			alert('Profile updated successfully!');
		} catch (error) {
			alert('Failed to update profile.\n' + error);
		} finally {
			setLoading(false);
		}
		navigate(`/admin/`);
	};

	return (
		<div className="max-w-md mx-auto mt-20">
			<button
				className="mr-2 bg-blue-400 text-white px-4 py-2 rounded"
				onClick={() => goToAdmin()}
			>
				Back
			</button>
			<form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
				<h1 className="text-2xl font-bold mb-4 text-center">New user</h1>
				<input
					type="text"
					placeholder="Name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<input
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<input
					type="password"
					placeholder="Password"
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<div className="w-full mb-4 p-2">
					<label for="permission-select">Choose a permission:</label>
					<span>&nbsp; &nbsp; </span>
					<select
						name="permission"
						id="permission-select"
						value={formData.permission}
						onChange={(e) => setFormData({ ...formData, permission: e.target.value})}
						className='border-x-2 border-y-2'
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<input
					type="text"
					placeholder="University"
					value={formData.university}
					onChange={(e) => setFormData({ ...formData, university: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<input
					type="text"
					placeholder="Address"
					value={formData.address}
					onChange={(e) => setFormData({ ...formData, address: e.target.value })}
					className="w-full mb-4 p-2 border rounded"
				/>
				<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
					{loading ? 'Updating...' : 'Create user'}
				</button>
			</form>
		</div>
	);
};

export default NewUser;
