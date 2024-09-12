import { createSlice } from '@reduxjs/toolkit';
import { TProduct } from 'src/types/product';
import actGetProductsByItems from './actions/actGetProductsByItems';
import { getCartTotalQuantitySelector } from './selector';
import { TLoading } from 'src/types/shared';

interface ICartState {
	items: { [key: string]: number }; // 1:1 1:2 2:2 first number for id then i extract name, price and other information and second number for the count of this item
	productsFullInfo: TProduct[];
	loading: TLoading;
	error: null | string;
}

const initialState: ICartState = {
	items: {},
	productsFullInfo: [],
	loading: 'idle',
	error: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const id = action.payload;
			if (!state.items[id]) {
				state.items[id] = 1;
			} else {
				state.items[id]++;
			}
		},
		cleanUpCart: (state) => {
			state.productsFullInfo = [];
		},
		cartItemChangeQuantity: (state, action) => {
			state.items[action.payload.id] = action.payload.quantity;
		},
		cartItemRemove: (state, action) => {
			const idToRemove = action.payload;
			delete state.items[idToRemove];
			state.productsFullInfo = state.productsFullInfo.filter((el) => {
				return el.id !== idToRemove;
			});
		},
		cartRemoveAllItems: (state) => {
			state.items = {};
			state.productsFullInfo = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(actGetProductsByItems.pending, (state) => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
			state.loading = 'succeeded';
			state.productsFullInfo = action.payload;
		});
		builder.addCase(actGetProductsByItems.rejected, (state, action) => {
			state.loading = 'failed';
			if (action.payload && typeof action.payload === 'string') {
				state.error = action.payload;
			}
		});
	},
});

// this approach is bad cuz it will call all useSelectors or useAppSelectors (from hooks) which will cause unnecessary rerendering
// const getCartQuantity = (state: RootState) => {
// 	console.log('wisam');
// 	const cartQuantity = Object.values(state.cart.items).reduce((sum, count) => {
// 		return sum + count;
// 	}, 0);

// 	return cartQuantity;
// };
// export { getCartQuantity };

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const {
	addToCart,
	cartItemChangeQuantity,
	cartItemRemove,
	cleanUpCart,
	cartRemoveAllItems,
} = cartSlice.actions;
export default cartSlice.reducer;
