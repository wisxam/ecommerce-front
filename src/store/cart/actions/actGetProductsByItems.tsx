import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import axios from 'axios';
import { TProduct } from 'src/types/product';
import { axiosErrorHandler } from '@utils';

const actGetProductsByItems = createAsyncThunk(
	'cart/actGetProductsByItems',
	async (_, thunkAPI) => {
		const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
		const { cart } = getState() as RootState;
		const itemId = Object.keys(cart.items);
		const concatenatedItemsId = itemId.map((el) => `id=${el}`).join('&');
		if (!itemId.length) {
			return fulfillWithValue([]);
		} else {
			try {
				const response = await axios.get<TProduct[]>(
					`/products?${concatenatedItemsId}`,
					{
						signal,
					}
				);
				return response.data;
			} catch (error) {
				return rejectWithValue(axiosErrorHandler(error));
			}
		}
	}
);

export default actGetProductsByItems;
