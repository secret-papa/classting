import { useSelector } from 'react-redux';

export const useSelectUser = () => useSelector((state) => state.user);
