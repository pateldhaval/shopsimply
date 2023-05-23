import { Link } from 'react-router-dom';

import { Category } from '@/app/types';

interface Props {
	category: Category;
}

export const CategoryCard: React.FC<Props> = (props) => {
	const { title, imageUrl } = props.category;
	return (
		<Link to={`/shop/${title.toLowerCase()}`}>
			<div className='h-96 bg-no-repeat bg-cover bg-center relative' style={{ backgroundImage: `url(${imageUrl})` }}>
				<div className='absolute bottom-0 left-0 w-full p-5 capitalize bg-slate-200/90 hover:bg-slate-300/90'>
					<h2 className='text-xl font-bold'>{title.toUpperCase()}</h2>
				</div>
			</div>
		</Link>
	);
};
