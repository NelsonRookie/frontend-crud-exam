import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [isAdminActive, setIsAdminActive] = useState(true); // Separate state to manage Admin/User toggle

	const toggleNavbar = () => setIsOpen(!isOpen);
	const toggleRole = () => setIsAdminActive(!isAdminActive); // Toggle role state

	return (
		<Navbar color='light' light expand='md' container='md'>
			<NavbarBrand
				tag={Link}
				to='/'
				onClick={toggleRole}
				style={{ color: isAdminActive ? 'blue' : 'black' }} // Conditional color for Admin
			>
				Admin
			</NavbarBrand>
			<NavbarToggler onClick={toggleNavbar} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className='mr-auto' navbar>
					<NavItem>
						<NavLink
							tag={Link}
							to='/users'
							onClick={toggleRole}
							style={{ color: isAdminActive ? 'black' : 'blue' }} // Conditional color for Users
						>
							Users
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default PageNav;
