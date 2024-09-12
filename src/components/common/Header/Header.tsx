import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeaderLeftbar from './HeaderLeftbar/HeaderLeftbar';

const { headerContainer, iconContainer } = styles;

const Header = () => {
	const navigate = useNavigate();

	return (
		<header>
			<div className={headerContainer}>
				<h1 className='hover:cursor-pointer'>
					<span
						onClick={() => {
							navigate('/');
						}}>
						My <Badge bg='info'>Ecom</Badge> training
					</span>
				</h1>
				<div className={iconContainer}>
					<HeaderLeftbar />
				</div>
			</div>
			<Navbar
				bg='dark'
				expand='lg'
				className='bg-body-tertiary'
				data-bs-theme='dark'>
				<Container>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link
								as={NavLink}
								to='/'>
								Home
							</Nav.Link>
							<Nav.Link
								as={NavLink}
								to='/categories'>
								Categories
							</Nav.Link>
							<Nav.Link
								as={NavLink}
								to='/about-us'>
								About
							</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link
								as={NavLink}
								to='/log-in'>
								Login
							</Nav.Link>
							<Nav.Link
								as={NavLink}
								to='/register'>
								Register
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
