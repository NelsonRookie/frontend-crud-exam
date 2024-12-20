import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "reactstrap";

// Modals
import AddModal from "./modals/createUserModal";
import ConfirmationModal from "./modals/confirmationModal";

function Index() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [createUserModalOpen, setCreateUserModalOpen] = useState(false); // state variable for Create User Modal
	const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal
	const [newUser, setNewUser] = useState({ email: "", first_name: "", last_name: "" }); // for creating new users
	const [showAllUsers, setShowAllUsers] = useState(false); // toggle for showing all users

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

				// Combine users from both pages
				const combinedPages = [...page1, ...page2];
				setUsers(combinedPages); // Store all users
			} catch (error) {
				setError(error.message); // Set error message
			} finally {
				setIsLoading(false); // Always stop loading
			}
		};
		fetchAllUsers();
	}, []);

	const toggleModal = () => setCreateUserModalOpen(!createUserModalOpen);
	const toggleConfirmationModal = () => setShowConfirmationModal(!showConfirmationModal);


	const createUser = async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const response = await fetch(`${apiKey}/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newUser),
			});
			if (!response.ok) throw new Error("Failed to create user");

			const createdUser = await response.json();

			// Assign a local ID based on the current users array
			const localId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

			// Override the server-provided ID for local consistency
			const userWithLocalId = { ...createdUser, id: localId };

			// Update the local state with the new user
			setUsers([...users, userWithLocalId]);

			// Close the modal and reset the input fields
			toggleModal();
			setNewUser({ email: "", first_name: "", last_name: "" });

			toggleConfirmationModal(); // Show confirmation modal
		} catch (error) {
			setError(error.message);
		}
	};

	if (isLoading) {
		return <div>Loading users...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const displayedUsers = showAllUsers ? users : users.slice(0, 10);

	return (
		<Container>
			<div className="mt-3 text-right">
				<Button color="primary" onClick={toggleModal}>
					+ Add User
				</Button>
			</div>

			<Table className="mt-3">
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
					{displayedUsers.map((user) => (
						<tr key={user.id}>
							<th scope="row">{user.id}</th>
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

			<div className="text-center mt-3">
				<Button color="primary" outline onClick={() => setShowAllUsers(!showAllUsers)}>
					{showAllUsers ? "Show Less" : "Show All Users"}
				</Button>
			</div>

			<AddModal
				isOpen={createUserModalOpen}
				toggle={toggleModal}
				newUser={newUser}
				setNewUser={setNewUser}
				createUser={createUser}
			/>

			{/* Confirmation Modal */}
			<ConfirmationModal
				isOpen={showConfirmationModal}
				toggle={toggleConfirmationModal}
				message="The new user has been successfully created and added to the list."
			/>
		</Container>
	);
}

export default Index;
