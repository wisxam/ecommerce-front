import { Button, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import { TProduct } from 'src/types/product';
import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/cart/cartSlice';
import { memo, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import LikeFilled from '@assets/svg/liked.svg?react';
import Like from '@assets/svg/like-unused.svg?react';
import { actLikeToggle } from '@store/wishlist/wishlistSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { product, productImg, maximumNotice, wishListBtn } = styles;

const Product = memo(
	({ title, price, img, id, max, quantity, isLiked, cat_prefix }: TProduct) => {
		const dispatch = useAppDispatch();
		const [btnDisabled, setBtnDisabled] = useState(false);
		const [snackbarOpen, setSnackbarOpen] = useState(false);
		const currentRemainingEntries = max - (quantity ?? 0);
		const [isLoading, setIsLoading] = useState(false);
		const quantityReachedToMax = currentRemainingEntries <= 0;
		const location = useLocation();
		const pathName = location.pathname;

		useEffect(() => {
			if (!btnDisabled) return;

			const debounce = setTimeout(() => {
				setBtnDisabled(false);
			}, 300);

			return () => {
				clearTimeout(debounce);
			};
		}, [btnDisabled]);

		const handleCloseSnackbar = () => {
			setSnackbarOpen(false);
		};

		const addToCartHandler = () => {
			dispatch(addToCart(id));
			setBtnDisabled(true);
			setSnackbarOpen(true);
		};

		const likeToggleHandler = () => {
			if (!isLoading) {
				setIsLoading(true);
				dispatch(actLikeToggle(id))
					.unwrap()
					.then(() => setIsLoading(false))
					.catch(() => setIsLoading(false));
			}
		};

		return (
			<div className={product}>
				<div className={productImg}>
					<div
						className={wishListBtn}
						onClick={() => {
							likeToggleHandler();
						}}>
						{isLoading ? (
							<Spinner
								animation='border'
								size='sm'
								variant='primary'
							/>
						) : isLiked ? (
							<LikeFilled />
						) : (
							<Like />
						)}
					</div>
					{pathName.includes('wishlist') ? (
						<Link to={`/categories/products/${cat_prefix}`}>
							<img
								src={img}
								alt={title}
							/>
						</Link>
					) : (
						<img
							src={img}
							alt={title}
						/>
					)}
				</div>
				<h2>{title}</h2>
				<h3>{price.toFixed(2)} Syp</h3>
				<p>Quantity: {quantity}</p>
				<p className={maximumNotice}>
					{quantityReachedToMax
						? "You can't place any more item(s)"
						: `you still have ${currentRemainingEntries} item(s) to add`}
				</p>
				<Button
					onClick={addToCartHandler}
					variant='info'
					style={{ color: 'white' }}
					disabled={btnDisabled || quantityReachedToMax}>
					{btnDisabled ? (
						<>
							<Spinner
								animation='border'
								size='sm'
							/>
							Loading
						</>
					) : (
						'Add to cart'
					)}
				</Button>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}>
					<Alert
						onClose={handleCloseSnackbar}
						severity={'success'}
						sx={{ width: '100%' }}>
						Item added successfuly
					</Alert>
				</Snackbar>
			</div>
		);
	}
);

export default Product;
