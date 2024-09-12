import React from 'react';
import { TLoading } from 'src/types/shared';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
	loading?: TLoading;
	error?: null | string;
	children?: React.ReactNode;
}

const Loading = ({ loading, error, children }: LoadingProps) => {
	if (loading === 'pending') return <CircularProgress />;
	if (loading === 'failed') return <p>{error}</p>;

	return <>{children}</>;
};

export default Loading;
