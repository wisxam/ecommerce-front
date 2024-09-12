import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	actGetCategories,
	cleanupCategoriesRecords,
} from '@store/categories/categoriesSlice';
import { useEffect } from 'react';

const useCategories = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { loading, error, records } = useAppSelector((state) => {
		return state.categoriesReducer;
	});
	const pathName = location.pathname.length;

	useEffect(() => {
		const promise = dispatch(actGetCategories());
		return () => {
			dispatch(cleanupCategoriesRecords());
			promise.abort();
		};
	}, [dispatch]); // no need to clean up categories because they frequently change but i save their data and no need for me to show and re-show every time i open it
	return { loading, error, records, pathName };
};

export default useCategories;
