import { HeaderCounter } from '@components/eCommerce';
import { getCartTotalQuantitySelector } from '@store/cart/selector';
import { useAppSelector } from '@store/hooks';
import Wishlist from '../../../../assets/svg/wishlist.svg?react';
import Logo from '../../../../assets/svg/shoppingcart.svg?react';
import styles from './styles.module.css';

const { divider } = styles;

const HeaderLeftbar = () => {
	const wishlistTotalQuantity = useAppSelector(
		(state) => state.wishlistSlice.itemsId.length
	);
	const cartTotalyQuantity = useAppSelector(getCartTotalQuantitySelector);
	return (
		<>
			<HeaderCounter
				page='wishlist'
				totalQuantity={wishlistTotalQuantity}
				svgIcon={<Wishlist title='wishlist' />}
			/>
			<hr className={divider} />
			<HeaderCounter
				page='cart'
				totalQuantity={cartTotalyQuantity}
				svgIcon={<Logo title='cart' />}
			/>
		</>
	);
};

export default HeaderLeftbar;
