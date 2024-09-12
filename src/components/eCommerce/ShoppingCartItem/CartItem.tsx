import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { TProduct } from 'src/types/product';
import { Link } from 'react-router-dom';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { memo } from 'react';

const { cartItem, product, productImg, productInfo, cartItemSelection } =
	styles;

type CartItemProps = {
	changeQuantityHandler: (id: number, quantity: number) => void;
	removeItemFromCart: (id: number) => void;
};

type CartItemComponentProps = TProduct & CartItemProps;

const CartItem = memo(
	({
		id,
		title,
		price,
		img,
		quantity,
		cat_prefix,
		max,
		changeQuantityHandler,
		removeItemFromCart,
	}: CartItemComponentProps) => {
		const maxQuantity = Array.from(
			{ length: max },
			(_, index) => index + 1
		).map((option) => (
			<MenuItem
				key={option}
				value={option}>
				{option}
			</MenuItem>
		));

		const maxQuantityMessage =
			(quantity ?? 0) - max >= 0
				? 'you reached the max quantity'
				: `you still have ${max - (quantity ?? 0)} item(s) left to add`;

		// const renderOptions = Array(max)
		// 	.fill(0)
		// 	.map((_, index) => {
		// 		const quantity = ++index;
		// 		return (
		// 			<option
		// 				key={quantity}
		// 				value={quantity}>
		// 				{quantity}
		// 			</option>
		// 		);
		// 	});

		const changeQuantity = (event: SelectChangeEvent<number>) => {
			const newQuantity = Number(event.target.value);
			changeQuantityHandler(id, newQuantity);
		};

		const removeItem = (itemId: number) => {
			removeItemFromCart(itemId);
		};

		return (
			<div className={cartItem}>
				<div className={product}>
					<Link to={`/categories/products/${cat_prefix}`}>
						<div className={productImg}>
							<img
								src={img}
								alt={title}
							/>
						</div>
					</Link>
					<div className={productInfo}>
						<h2>{title}</h2>
						<h3>Price: {price.toFixed(2)} SYP</h3>
						<h2>Quantity: {maxQuantityMessage}</h2>
						<h2>Max Items: {max}</h2>
						<Button
							onClick={() => {
								removeItem(id);
							}}
							variant='secondary'
							style={{ color: 'white', width: '100px' }}
							className='mt-auto'
							type='button'>
							Remove
						</Button>
					</div>
				</div>
				<div className={cartItemSelection}>
					<Select
						aria-label='Default select example'
						value={quantity ?? 1}
						onChange={changeQuantity}>
						{maxQuantity}
					</Select>
				</div>
			</div>
		);
	}
);

export default CartItem;
