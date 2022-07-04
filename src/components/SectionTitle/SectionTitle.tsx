// import './SectionTitle.css';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const SectionTitle: React.FC<Props> = (props) => {
	let classes = ['text-3xl font-bold mb-10'];

	if (props.className) {
		classes.push(props.className);
	}

	return (
		<>
			<div className={classes.join(' ')}>{props.children}</div>
		</>
	);
};
