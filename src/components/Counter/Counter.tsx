// import './Counter.css';
import { useState } from 'react';

interface Props {
	// children: React.ReactNode;
}

export const Counter: React.FC<Props> = (props) => {
	const [count, setCount] = useState(0);

	return (
		<>
			<button type='button' onClick={() => setCount((count) => count + 1)}>
				Count: {count}
			</button>
		</>
	);
};
