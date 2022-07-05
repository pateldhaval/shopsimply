import { useSelector } from 'react-redux';

export const userSelector = () => useSelector((state: any) => state.user);
