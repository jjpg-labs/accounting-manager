import { Form } from '@/app/components/Form';
import { INPUT_CLASSES } from '@/app/Dashboard/components/diaryModal';
import { setUser } from '@/features/user/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
}: LoginModalProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }

        return response.json();
      })
      .then((data) => {
        dispatch(setUser(data.user));
        handleCloseModal();
      })
      .catch((error) => {
        console.log('Login error:', error);
      });
  };

  return (
    <Form
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      title="Login"
    >
      <input
        className={INPUT_CLASSES}
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={INPUT_CLASSES}
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form>
  );
};
