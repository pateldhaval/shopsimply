// import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const Button: React.FC<Props> = (props) => {
	return (
		<button
			className='py-2 px-6 rounded border border-slate-300 bg-slate-300'
			{...props}
		>
			{props.children}
		</button>
	);
};
