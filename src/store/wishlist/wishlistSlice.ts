import { createSlice } from '@reduxjs/toolkit';
import actLikeToggle from './actions/actLikeToggle';
import actGetLikedProducts from './actions/actGetLikedProducts';
import { TLoading } from 'src/types/shared';
import { TProduct } from 'src/types/product';

interface IWishlistState {
	itemsId: number[];
	productsFullInfo: TProduct[];
	error: null | string;
	loading: TLoading;
}

const initialState: IWishlistState = {
	itemsId: [],
	productsFullInfo: [],
	error: null,
	loading: 'idle',
};

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		itemsLiking: (state, action) => {
			state.itemsId[action.payload] = action.payload;
			console.log(state.itemsId.values);
		},
		productsFullInfoCleanUp: (state) => {
			state.productsFullInfo = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(actLikeToggle.pending, (state) => {
			state.error = null;
		});
		builder.addCase(actLikeToggle.fulfilled, (state, action) => {
			if (action.payload.type === 'add') {
				state.itemsId.push(action.payload.id);
			} else {
				state.itemsId = state.itemsId.filter(
					(itemId) => itemId !== action.payload.id
				);
				state.productsFullInfo = state.productsFullInfo.filter(
					(itemId) => itemId.id !== action.payload.id
				);
			}
		});
		builder.addCase(actLikeToggle.rejected, (state, action) => {
			state.loading = 'failed';
			if (action.payload && typeof action.payload === 'string') {
				state.error = action.payload;
			}
		});

		// get wishlist items
		builder.addCase(actGetLikedProducts.rejected, (state, action) => {
			if (action.payload && typeof action.payload === 'string') {
				state.error = action.payload;
			}
		});
		builder.addCase(actGetLikedProducts.pending, (state) => {
			state.error = null;
			state.loading = 'pending';
		});
		builder.addCase(actGetLikedProducts.fulfilled, (state, action) => {
			state.loading = 'succeeded';
			state.productsFullInfo = action.payload;
		});
	},
});

export const { itemsLiking, productsFullInfoCleanUp } = wishlistSlice.actions;
export { actLikeToggle, actGetLikedProducts };
export default wishlistSlice.reducer;
