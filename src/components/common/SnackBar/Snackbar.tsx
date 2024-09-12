import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { createPortal } from 'react-dom';

const SnackbarContext = createContext<
	| {
			showSnackbar: (options: {
				message: string;
				severity?: 'success' | 'error' | 'warning' | 'info';
				duration?: number;
			}) => void;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| undefined
>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [snackbarState, setSnackbarState] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'error' | 'warning' | 'info';
		duration: number;
	}>({
		open: false,
		message: '',
		severity: 'success',
		duration: 6000,
	});

	const showSnackbar = ({
		message,
		severity = 'success',
		duration = 6000,
	}: {
		message: string;
		severity?: 'success' | 'error' | 'warning' | 'info';
		duration?: number;
	}) => {
		setSnackbarState({
			open: true,
			message,
			severity,
			duration,
		});
	};

	const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarState((prev) => ({ ...prev, open: false }));
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			{createPortal(
				<Snackbar
					open={snackbarState.open}
					autoHideDuration={snackbarState.duration}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert
						onClose={handleClose}
						severity={snackbarState.severity}
						sx={{ width: '100%' }}>
						{snackbarState.message}
					</Alert>
				</Snackbar>,
				document.body
			)}
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => useContext(SnackbarContext);
