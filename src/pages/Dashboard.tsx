import { Counter } from '@/components/Counter';

interface Props {}

const Dashboard: React.FC<Props> = (props) => {
	return (
		<>
			<h1>Dashboard</h1>
			<Counter />
		</>
	);
};

export default Dashboard;
