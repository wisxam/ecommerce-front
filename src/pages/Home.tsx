import { Button } from '@mui/material';
import { useSnackbar } from '@components/common/SnackBar/Snackbar';

const AnyComponent = () => {
	const { showSnackbar } = useSnackbar() || {};

	const handleClickSuccess = () => {
		showSnackbar?.({
			message: 'Operation successful!',
			severity: 'success',
		});
	};

	const handleClickError = () => {
		showSnackbar?.({
			message: 'There was an error.',
			severity: 'error',
		});
	};

	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				onClick={handleClickSuccess}>
				Show Success Snackbar
			</Button>
			<Button
				variant='contained'
				color='secondary'
				onClick={handleClickError}
				style={{ marginLeft: '10px' }}>
				Show Error Snackbar
			</Button>
		</div>
	);
};

export default AnyComponent;
