// import './Counter.css';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Section } from '@/components/Section';

interface Props {
	// children: React.ReactNode;
}

export const Counter: React.FC<Props> = (props) => {
	const [count, setCount] = useState(0);

	return (
		<>
			<Section>
				<Button type='button' onClick={() => setCount((count) => count + 1)}>
					Count: {count}
				</Button>
			</Section>
		</>
	);
};
