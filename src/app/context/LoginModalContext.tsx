'use client';

import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { LoginModal } from '../components/LoginModal';

interface LoginModalContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

// Create the context
const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export function LoginModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <LoginModalContext.Provider
      value={{ isLoginModalOpen, setIsLoginModalOpen }}
    >
      {children}
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
      />
    </LoginModalContext.Provider>
  );
}

// Custom hook for consuming the context easily
export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
}
