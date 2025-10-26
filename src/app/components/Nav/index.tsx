'use client';

import Image from 'next/image';
import { useLoginModal } from '@/app/context/LoginModalContext';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/user/userSlice';
import { useEffect } from 'react';

export default function Nav() {
  const { setIsLoginModalOpen } = useLoginModal();
  const isUserLoggedIn = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        dispatch(logout());
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, [isUserLoggedIn]);

  return (
    <header className="flex z-50 border-b border-gray-300 border-solid h-16 top-0 inset-x-0 absolute">
      {isUserLoggedIn ? (
        <button onClick={handleLogout}>
          <Image
            src="/loggedNav.svg"
            alt="User Logged In"
            width={40}
            height={40}
          />
        </button>
      ) : (
        <button onClick={handleLoginModalOpen}>
          <Image src="/notLogged.svg" alt="Login" width={40} height={40} />
        </button>
      )}
    </header>
  );
}
