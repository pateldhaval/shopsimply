// import './CategoryItem.css';

import { Category } from '@/app/types';

interface Props {
	// children: React.ReactNode;
	category: Category;
}

export const CategoryItem: React.FC<Props> = (props) => {
	const { title, imageUrl } = props.category;
	return (
		<>
			<div
				className='col-span-1 h-96 bg-no-repeat bg-cover bg-center relative'
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<div className='absolute bottom-0 left-0 w-full p-5 capitalize bg-slate-200/90 hover:bg-slate-300/90'>
					<h2 className='text-2xl'>{title}</h2>
				</div>
			</div>
		</>
	);
};
