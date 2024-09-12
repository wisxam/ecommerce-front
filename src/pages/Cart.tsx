import { Heading } from '@components/common';
import { CartItemList, CartSubtotalPrice } from '@components/eCommerce';
import { Loading } from '@components/feedback';
import { Button } from '@mui/material';
import useCart from '@hooks/useCart';

const Cart = () => {
	const {
		loading,
		error,
		products,
		changeQuantityHandler,
		removeItemFromCart,
		removeAllCartItems,
		pathName,
	} = useCart();

	return (
		<>
			<Heading
				title={`${location.pathname.slice(1, pathName).toUpperCase()}`}
			/>
			<Loading
				loading={loading}
				error={error}>
				{products.length <= 0 ? (
					'Your cart is empty, consider adding items.'
				) : (
					<>
						<CartItemList
							products={products}
							changeQuantityHandler={changeQuantityHandler}
							removeItemFromCart={removeItemFromCart}
						/>
						{products.length > 0 && (
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: '20px',
								}}>
								<Button
									variant='contained'
									color='error'
									onClick={removeAllCartItems}>
									Remove All Items
								</Button>
							</div>
						)}
						<CartSubtotalPrice products={products} />
					</>
				)}
			</Loading>
		</>
	);
};

export default Cart;
