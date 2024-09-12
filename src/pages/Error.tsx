import { Container } from 'react-bootstrap';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import '@styles/error.css';

const Error = () => {
	const error = useRouteError();
	let errorStatus: number;
	let errorStatusText: string;

	if (isRouteErrorResponse(error)) {
		errorStatus = error.status;
		errorStatusText = error.statusText;
	} else {
		errorStatus = 404;
		errorStatusText = 'Page Not Found';
	}
	return (
		<Container className='notFound'>
			<h1>{errorStatus}</h1>
			<p>{errorStatusText}</p>
			<Link
				to='/'
				replace={true}>
				{''}
				looks like you tried to reach something that does not exist at the
				moment
			</Link>
		</Container>
	);
};

export default Error;
