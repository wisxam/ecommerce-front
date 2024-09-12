import { TProduct } from 'src/types/product';
import CartItem from '../ShoppingCartItem/CartItem';

type CartItemListProps = {
	products: TProduct[];
	changeQuantityHandler: (id: number, quantity: number) => void;
	removeItemFromCart: (id: number) => void;
};

const CartItemList = ({
	products,
	changeQuantityHandler,
	removeItemFromCart,
}: CartItemListProps) => {
	const renderList = products.map((el) => {
		return (
			<CartItem
				key={el.id}
				changeQuantityHandler={changeQuantityHandler}
				removeItemFromCart={removeItemFromCart}
				{...el}
			/>
		);
	});
	return <div>{renderList}</div>;
};

export default CartItemList;
