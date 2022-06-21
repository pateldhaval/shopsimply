// import './Section.css';

interface Props {
	children: React.ReactNode;
}

export const Section: React.FC<Props> = (props) => {
	return (
		<section className='p-20'>
			<div className='container'>{props.children}</div>
		</section>
	);
};
