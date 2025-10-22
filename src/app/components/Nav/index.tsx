'use client';

import Image from 'next/image';
import { useLoginModal } from '@/app/context/LoginModalContext';

export default function Nav() {
  const { setIsLoginModalOpen } = useLoginModal();

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className="bg-blue-700 p-2 flex justify-center">
      <button onClick={handleLoginModalOpen}>
        <Image src="/notLogged.svg" alt="Login" width={40} height={40} />
      </button>
    </div>
  );
}
