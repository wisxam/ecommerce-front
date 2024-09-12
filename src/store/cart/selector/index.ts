import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

const getCartTotalQuantitySelector = createSelector(
	(state: RootState) => state.cart.items, // the first arg will be checked if anything changed, if true then the second arg will execute and thus changing in the state
	(items) => {
		// (items) here is equal to the return of state.cart.items
		const cartQuantity = Object.values(items).reduce((sum, count) => {
			return sum + count;
		}, 0);

		return cartQuantity;
	}
); // createSelector takes 3 args, first to init the state and know which state you're using, the after state.cart.items will be rturned to the second arg, and will be used as a function, used as useCallBack and useMemo

export { getCartTotalQuantitySelector };
