// import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	block?: boolean;
}

export const Button: React.FC<Props> = (props) => {
	// Right way to separate out native properties
	const { block, ...rest } = props;

	let classes = ['py-2 px-6 rounded border border-slate-300 bg-slate-300'];

	if (block) classes.push('w-full');

	return (
		<button className={classes.join(' ')} {...rest}>
			{props.children}
		</button>
	);
};
