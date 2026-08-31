import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			try {
				const usersRes = await axiosInstance.get('/api/auth?info=0', {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setUsers(usersRes.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, [user]);

	
	const goToEdit = async (userId) => {
		navigate(`/admin/user/${userId}`);
	};
	const goToNew = async () => {
		navigate(`/admin/user/new`);
	};

	const handleDelete = async (userId) => {
		const deleteConfirm = window.confirm(`Deleting review: ${userId}`);
		console.log(`deleteConfirm: [${deleteConfirm}] [${typeof deleteConfirm}]`);
		if (deleteConfirm) {
			const userDel = await axiosInstance.delete(`/auth/${userId}`, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
		}

	}

	return (
		<div className="container mx-auto p-6">
		<button
			className="mr-2 bg-blue-400 text-white px-4 py-2 rounded"
			onClick={() => goToNew()}
		>
			New
		</button>
		{users.map((u) => {
			return (
				<div key={u._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
					<div className='flex'>
						<h2 className="font-bold">{u.name}</h2>
						<h4>&nbsp; &nbsp; {u.permission}</h4>
					</div>
					<div className="mt-2">
						<button
							className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
							onClick={() => goToEdit(u._id)}
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(u._id)}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Delete
						</button>
					</div>
				</div>
			);
		})}
		</div>
	);
};

export default Admin;
