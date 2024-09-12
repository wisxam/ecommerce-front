import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TProduct } from 'src/types/product';
import { axiosErrorHandler } from '@utils';

const actGetProductsByCatPrefix = createAsyncThunk(
	'products/actGetProductsByCatPrefix',
	async (prefix: string, thunkAPI) => {
		const { rejectWithValue, signal } = thunkAPI;
		try {
			const response = await axios.get<TProduct[]>(
				`/products?cat_prefix=${prefix}`,
				{
					signal,
				}
			);
			// const data = response.data.map((el) => {
			// 	el;
			// }); // decide the data type
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		} // need to check if an error is an axios error
	}
); // im not passing a payload in async so pass in an underscore

export default actGetProductsByCatPrefix;
