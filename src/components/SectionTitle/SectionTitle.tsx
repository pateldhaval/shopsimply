// import './SectionTitle.css';

interface Props {
	children: React.ReactNode;
}

export const SectionTitle: React.FC<Props> = (props) => {
	return (
		<>
			<div className='text-3xl font-bold mb-10'>{props.children}</div>
		</>
	);
};
