import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// pages
const Home = lazy(() => import('@pages/Home'));
const Wishlist = lazy(() => import('@pages/Wishlist'));
const Cart = lazy(() => import('@pages/Cart'));
const Products = lazy(() => import('@pages/Products'));
const Aboutus = lazy(() => import('@pages/Aboutus'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Error = lazy(() => import('@pages/Error'));
const Categories = lazy(() => import('@pages/Categories'));
// layouts
import CircularProgress from '@mui/material/CircularProgress';
const MainLayout = lazy(() => import('@layouts/MainLayout'));
// const checkPrefix = /^[a-zA-Z]+$/;

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<CircularProgress />}>
				<MainLayout />
			</Suspense>
		),
		errorElement: (
			<Suspense fallback='loading please wait...'>
				<Error />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback='loading please wait...'>
						<Home />
					</Suspense>
				),
			},
			{
				path: 'categories',
				element: (
					<Suspense fallback='loading please wait...'>
						<Categories />
					</Suspense>
				),
			},
			{
				path: 'about-us',
				element: (
					<Suspense fallback='loading please wait...'>
						<Aboutus />
					</Suspense>
				),
			},
			{
				path: 'categories/products/:prefix',
				loader: ({ params }) => {
					if (
						typeof params.prefix === 'string' &&
						!/^[a-zA-Z]+$/.test(params.prefix)
					) {
						throw new Response('Bad Request', {
							statusText: 'Category not found',
							status: 400,
						});
					}
					return true;
				},
				element: (
					<Suspense fallback='loading please wait...'>
						<Products />
					</Suspense>
				),
			},
			{
				path: 'log-in',
				element: (
					<Suspense fallback='loading please wait...'>
						<Login />
					</Suspense>
				),
			},
			{
				path: 'register',
				element: (
					<Suspense fallback='loading please wait...'>
						<Register />
					</Suspense>
				),
			},
			{
				path: 'cart',
				element: (
					<Suspense fallback='loading please wait...'>
						<Cart />
					</Suspense>
				),
			},
			{
				path: 'wishlist',
				element: (
					<Suspense fallback='loading please wait...'>
						<Wishlist />
					</Suspense>
				),
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
