//test file src/app/components/AuthInitializer/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthInitializer from './index';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import { useSetUser } from '@/app/hooks/useSetUser';

jest.mock('@/app/hooks/useAppSelector');
jest.mock('@/app/hooks/useSetUser');

describe('AuthInitializer', () => {
  const mockRefetchUser = jest.fn();
  beforeEach(() => {
    (mockRefetchUser as jest.Mock).mockClear();
    (useSetUser as jest.Mock).mockReturnValue(mockRefetchUser);
  });

  it('should render loading state when isInitializing is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);
    render(
      <AuthInitializer>
        <div>Child Content</div>
      </AuthInitializer>
    );
    expect(screen.getByText('Cargando sesión...')).toBeInTheDocument();
  });

  it('should render children when isInitializing is false', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);
    render(
      <AuthInitializer>
        <div>Child Content</div>
      </AuthInitializer>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should call refetchUser on mount', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);
    render(
      <AuthInitializer>
        <div>Child Content</div>
      </AuthInitializer>
    );
    expect(mockRefetchUser).toHaveBeenCalled();
  });
});
