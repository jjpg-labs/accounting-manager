import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthInitializer from './index';
import { useSetUser } from '@/app/hooks/useSetUser';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@/app/hooks/useSetUser');

const rootReducer = (state = { user: { isInitializing: false } }) => state;

const renderComponent = (isInitializing: boolean) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: {
        isInitializing: isInitializing,
      },
    },
  });

  return render(
    <Provider store={store}>
      <AuthInitializer>
        <div>Child Content</div>
      </AuthInitializer>
    </Provider>
  );
};

describe('AuthInitializer', () => {
  const mockRefetchUser = jest.fn();

  beforeEach(() => {
    (mockRefetchUser as jest.Mock).mockClear();
    (useSetUser as jest.Mock).mockReturnValue(mockRefetchUser);
  });

  it('should render loading state when isInitializing is true', () => {
    renderComponent(true);

    expect(screen.getByText('Cargando sesión...')).toBeInTheDocument();
  });

  it('should render children when isInitializing is false', () => {
    renderComponent(false);

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should call refetchUser on mount', () => {
    renderComponent(false);

    expect(mockRefetchUser).toHaveBeenCalled();
  });
});
