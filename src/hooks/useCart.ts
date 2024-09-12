import {
	actGetProductsByItems,
	cartItemChangeQuantity,
	cartItemRemove,
	cartRemoveAllItems,
	cleanUpCart,
} from '@store/cart/cartSlice';

import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const useCart = () => {
	const dispatch = useAppDispatch();
	const { items, productsFullInfo, loading, error } = useAppSelector(
		(state) => state.cart
	);

	const pathName = location.pathname.length;

	useEffect(() => {
		const promise = dispatch(actGetProductsByItems());
		return () => {
			dispatch(cleanUpCart());
			promise.abort();
		};
	}, [dispatch]);

	const products = useMemo(
		() =>
			productsFullInfo.map((el) => ({
				...el,
				quantity: items[el.id],
			})),
		[productsFullInfo, items]
	);

	const changeQuantityHandler = useCallback(
		(id: number, quantity: number) => {
			dispatch(cartItemChangeQuantity({ id, quantity }));
		},
		[dispatch]
	);

	const removeItemFromCart = useCallback(
		(id: number) => {
			dispatch(cartItemRemove(id));
		},
		[dispatch]
	);

	const removeAllCartItems = () => {
		dispatch(cartRemoveAllItems());
	};

	return {
		loading,
		error,
		products,
		changeQuantityHandler,
		removeItemFromCart,
		removeAllCartItems,
		pathName,
	};
};

export default useCart;
