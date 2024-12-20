import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'reactstrap';

function Index() {

	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	/**
	 * Fetch users data from the given page number.
	 * @param {number} pageNumber
	 * @returns {Array} List of users for the given page.
	 */
	const fetchUserPage = async (pageNumber) => {
		try {
			const apiKey = process.env.REACT_APP_KEY;

			if (!apiKey) {
				throw new Error("API key is not defined");
			}

			const response = await fetch(`${apiKey}?page=${pageNumber}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch data for page ${pageNumber}`);
			}

			const data = await response.json();
			return data.data; // Return user data array
		} catch (error) {
			console.error(error.message);
			throw error; // Propagate error to caller
		}
	};

	/**
	 * Fetch all users from multiple pages.
	 */
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				setIsLoading(true);
				const page1 = await fetchUserPage(1); // Fetch users from page 1
				const page2 = await fetchUserPage(2); // Fetch users from page 2

				// Combine users from both pages and take the first 10 rows
				const combinedPages = [...page1, ...page2];
				setUsers(combinedPages.slice(0, 10)); // Set users to the first 10
			} catch (error) {
				setError(error.message); // Set error message
			} finally {
				setIsLoading(false); // Always stop loading
			}
		};
		fetchAllUsers();
	}, []);

	if (isLoading) {
		return <div>Loading users...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<Container>
			<div className='mt-3 text-right'>
				<Button color='primary'>+ Add User</Button>
			</div>

			<Table className='mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Avatar</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<th scope='row'>{user.id}</th>
							<td>
								<img src={user.avatar} alt="User Profile" width="50" height="50" />
							</td>
							<td>{user.email}</td>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>
								<Button color="primary" size="sm" className="me-2">
									Edit
								</Button>
								<Button color="danger" size="sm">
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}
export default Index;
