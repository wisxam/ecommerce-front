import { Row, Col } from 'react-bootstrap';

type GridListProps<T> = {
	records: T[];
	renderItem: (record: T) => React.ReactNode;
};

type hasID = {
	id?: number;
};

const GridList = <T extends hasID>({
	records,
	renderItem,
}: GridListProps<T>) => {
	const categoriesList =
		records.length > 0
			? records.map((record) => {
					return (
						<Col
							key={record.id}
							xs={6}
							md={3}
							className='d-flex justify-content-center mb-5 mt-2'>
							{renderItem({ ...record })}
						</Col>
					);
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  })
			: 'there are no categories of this field at the moment';

	return <Row>{categoriesList}</Row>;
};

export default GridList;
