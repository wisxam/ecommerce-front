import { Loading } from '@components/feedback';
import { GridList, Heading } from '@components/common';
import { TProduct } from 'src/types/product';
import { Product } from '@components/eCommerce';
import useWishlist from '@hooks/useWishlist';

const Wishlist = () => {
	const { pathName, loading, error, records } = useWishlist();

	return (
		<>
			<Heading
				title={`${location.pathname.slice(1, pathName).toUpperCase()}`}
			/>
			<Loading
				loading={loading}
				error={error}>
				{records.length > 0 ? (
					<GridList
						records={records}
						renderItem={(record: TProduct) => <Product {...record} />}
					/>
				) : (
					"You don't have items on wishlist, consider liking some"
				)}
			</Loading>
		</>
	);
};

export default Wishlist;
