import { useSelector } from 'react-redux';

// export const useSelectorLoadedUser = useSelectUser((state) => state.user)
export const useSelectUser = () => useSelector((state) => state.user);
