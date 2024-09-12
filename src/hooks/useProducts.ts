import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect } from 'react';
import {
	actGetProductsByCatPrefix,
	productsCleanUp,
} from '@store/products/productsSlice';
import { useParams } from 'react-router-dom';

const useProducts = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const path = params?.prefix;

	const { loading, error, records } = useAppSelector((state) => {
		return state.productsReducer;
	});

	const wishlistItemsId = useAppSelector((state) => {
		return state.wishlistSlice.itemsId;
	});

	const cartItems = useAppSelector((state) => state.cart.items);

	useEffect(() => {
		// let prefix: string;
		// if (params.prefix && typeof params.prefix === 'string') {
		// 	prefix = params.prefix;
		// 	dispatch(actGetProductsByCatPrefix(prefix));
		// }
		const promise = dispatch(
			actGetProductsByCatPrefix(params.prefix as string)
		);
		return () => {
			dispatch(productsCleanUp());
			promise.abort();
		};
	}, [dispatch, params]);

	const productsFullInfo = records.map((el) => ({
		...el,
		quantity: cartItems[el.id] ?? 0,
		isLiked: wishlistItemsId.includes(el.id),
	}));
	return { loading, error, productsFullInfo, path };
};

export default useProducts;
