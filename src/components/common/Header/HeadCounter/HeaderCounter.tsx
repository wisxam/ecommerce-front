import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type HeadCounterProps = {
	totalQuantity: number;
	svgIcon: React.ReactNode;
	page: string;
};

const HeaderCounter = ({ totalQuantity, svgIcon, page }: HeadCounterProps) => {
	const navigate = useNavigate();
	const [isAnimate, setIsAnimate] = useState(false);
	const quantityAnimation = isAnimate ? 'animate-bounceIn' : '';

	useEffect(() => {
		if (!totalQuantity) {
			return;
		}
		setIsAnimate(true);
		const debounce = setTimeout(() => {
			setIsAnimate(false);
		}, 300);

		return () => clearTimeout(debounce);
	}, [totalQuantity]);

	return (
		<div
			className='relative flex items-center hover:cursor-pointer'
			onClick={() => {
				navigate(page);
			}}>
			{svgIcon}
			{totalQuantity > 0 && (
				<div
					className={`bg-cyan-500 text-white rounded-full w-6 h-6 flex justify-center ${quantityAnimation}`}>
					{totalQuantity}
				</div>
			)}
		</div>
	);
};

export default HeaderCounter;
