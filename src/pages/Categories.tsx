import { Container } from 'react-bootstrap';
import { Category } from '@components/eCommerce';
import { Loading } from '@components/feedback';
import { GridList } from '@components/common';
import { TCategory } from 'src/types/category';
import { Heading } from '@components/common';
import useCategories from '@hooks/useCategories';

const Categories = () => {
	const { loading, error, records, pathName } = useCategories();
	return (
		<>
			<Heading
				title={`${location.pathname.slice(1, pathName).toUpperCase()}`}
			/>
			<Container>
				<Loading
					loading={loading}
					error={error}>
					<GridList
						records={records}
						renderItem={(record: TCategory) => {
							return <Category {...record} />;
						}}
					/>
				</Loading>
			</Container>
		</>
	);
};

export default Categories;
