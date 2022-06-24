// import './Input.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	// children: React.ReactNode;
	label?: string;
}

export const Input: React.FC<Props> = (props) => {
	const { label, ...rest } = props;
	return (
		<div>
			<label className='block'>{label}</label>
			<input className='w-full border rounded py-2 px-4' {...rest} />
		</div>
	);
};
