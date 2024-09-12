import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TProduct } from 'src/types/product';
import { axiosErrorHandler } from '@utils';

type TResponse = TProduct[];

const actGetLikedProducts = createAsyncThunk(
	'/wishlist/actGetLikedProducts',
	async (_, thunkAPI) => {
		const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;

		try {
			const userWishlist = await axios.get<{ productId: number }[]>(
				'/wishlist?userId=1',
				{
					signal,
				}
			);

			if (!userWishlist.data[0]) {
				return fulfillWithValue([]);
			}

			const concatenatePromises = userWishlist.data
				.map((el) => `id=${el.productId}`)
				.join('&');

			const response = await axios.get<TResponse>(
				`/products?${concatenatePromises}`
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	}
);

export default actGetLikedProducts;
