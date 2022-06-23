// import './Footer.css';

interface Props {
	// children: React.ReactNode;
}

export const Footer: React.FC<Props> = (props) => {
	return (
		<footer className='py-3 border-t'>
			<div className='container'>
				<span className='font-bold'>ShopSimply</span>, All rights reserved.
			</div>
		</footer>
	);
};
