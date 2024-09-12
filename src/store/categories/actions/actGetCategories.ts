import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCategory } from 'src/types/category';
import { axiosErrorHandler } from '@utils';

const actGetCategories = createAsyncThunk('categories', async (_, thunkAPI) => {
	const { rejectWithValue, signal } = thunkAPI;
	try {
		const response = await axios.get<TCategory[]>('/category', {
			signal,
		});

		// const data = response.data.map((el) => {
		// 	el;
		// }); // decide the data type
		return response.data;
	} catch (error) {
		return rejectWithValue(axiosErrorHandler(error));
	} // need to check if an error is an axios error
}); // im not passing a payload in async so pass in an underscore

export default actGetCategories;
