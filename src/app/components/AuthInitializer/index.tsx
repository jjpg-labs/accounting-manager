'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import { useSetUser } from '@/app/hooks/useSetUser';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const isInitializing = useAppSelector((state) => state.user.isInitializing);
  const refetchUser = useSetUser();

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Cargando sesión...
      </div>
    );
  }

  return <>{children}</>;
}
