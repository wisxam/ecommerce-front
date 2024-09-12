import { TProduct } from 'src/types/product';
import styles from './styles.module.css';

type CartSubtotalPriceProps = {
	products: TProduct[];
};

const CartSubtotalPrice = ({ products }: CartSubtotalPriceProps) => {
	const totalPrice = products.reduce((accumulator, el) => {
		const price = el.price;
		const quantity = el.quantity;
		if (quantity && typeof quantity === 'number')
			return accumulator + price * quantity;
		else return accumulator;
	}, 0);

	return (
		<div className={styles.container}>
			<span>Subtotal:</span>
			<span>{totalPrice.toFixed(2)}</span>
		</div>
	);
};

export default CartSubtotalPrice;
