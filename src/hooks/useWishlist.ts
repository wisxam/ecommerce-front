import {
	actGetLikedProducts,
	productsFullInfoCleanUp,
} from '@store/wishlist/wishlistSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useLocation } from 'react-router-dom';

const useWishlist = () => {
	const location = useLocation();
	const pathName = location.pathname.length;
	const dispatch = useAppDispatch();

	const { loading, error, productsFullInfo } = useAppSelector((state) => {
		return state.wishlistSlice;
	});

	const cartItems = useAppSelector((state) => state.cart.items);

	useEffect(() => {
		const promise = dispatch(actGetLikedProducts());
		return () => {
			dispatch(productsFullInfoCleanUp());
			promise.abort();
		};
	}, [dispatch]);

	const records = productsFullInfo.map((el) => ({
		...el,
		quantity: cartItems[el.id] ?? 0,
		isLiked: true,
	}));

	return { pathName, loading, error, records };
};

export default useWishlist;
