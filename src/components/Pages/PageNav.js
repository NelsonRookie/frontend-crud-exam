import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

function PageNav() {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand tag={Link} to='/'>
				Admin
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className='mr-auto' navbar>
					<NavItem>
						<NavLink tag={Link} to='/users'>
							Users
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default PageNav;
