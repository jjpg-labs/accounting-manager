import { setInitializationFailed, setUser } from '@/features/user/userSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useSetUser = () => {
  const dispatch = useDispatch();

  const fetchAndSetUser = useCallback(() => {
    fetch('/api/auth/me', { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Authentication failed or token invalid');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.error('User initialization failed:', error);
        dispatch(setInitializationFailed());
      });
  }, [dispatch]);

  return fetchAndSetUser;
};
