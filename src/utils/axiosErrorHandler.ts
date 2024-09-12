import { isAxiosError } from 'axios';

const axiosErrorHandler = (error: unknown) => {
	if (isAxiosError(error)) return error.response?.data.message || error.message;
	else {
		return 'An unexpected error ocurred';
	}
};

export default axiosErrorHandler;
