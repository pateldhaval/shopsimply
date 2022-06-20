import { Counter } from '@/components/Counter';

interface Props {}

const Dashboard: React.FC<Props> = (props) => {
	return (
		<>
			<h1 className='text-3xl font-bold'>Dashboard</h1>
			<Counter />
		</>
	);
};

export default Dashboard;
