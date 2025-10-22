'use client';

import { useState } from 'react';
import { DiaryModal } from './components/diaryModal';

export default function Dashboard() {
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsDiaryModalOpen(true);
  };

  return (
    <main className="flex flex-col sm:flex-row flex-wrap pt-10 justify-center">
      <section className="flex flex-col w-full sm:w-1/2 pb-10 items-center gap-4">
        <button onClick={handleOpenModal}>Añadir registro</button>
        <DiaryModal
          isModalOpen={isDiaryModalOpen}
          setIsModalOpen={setIsDiaryModalOpen}
        />
      </section>
    </main>
  );
}
