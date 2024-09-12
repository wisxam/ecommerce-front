import { Container } from 'react-bootstrap';
import { Product } from '@components/eCommerce';
import { Loading } from '@components/feedback';
import { GridList, Heading } from '@components/common';
import { TProduct } from 'src/types/product';
import useProducts from '@hooks/useProducts';
const Products = () => {
	const { loading, error, productsFullInfo, path } = useProducts();
	return (
		<>
			<Heading title={`${path?.toUpperCase()} Products`}></Heading>
			<Container>
				<Loading
					loading={loading}
					error={error}>
					<GridList
						records={productsFullInfo}
						renderItem={(record: TProduct) => <Product {...record} />}
					/>
				</Loading>
			</Container>
		</>
	);
};

export default Products;
