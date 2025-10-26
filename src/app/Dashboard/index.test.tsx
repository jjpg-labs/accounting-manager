import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './';
import { configureStore } from '@reduxjs/toolkit';
import AuthInitializer from '../components/AuthInitializer';
import { Provider } from 'react-redux';

jest.mock('./components/diaryModal', () => ({
  DiaryModal: ({ isModalOpen }: { isModalOpen: boolean }) =>
    isModalOpen ? (
      <div data-testid="mock-diary-modal">Modal abierto</div>
    ) : null,
}));

global.fetch = jest.fn();

const rootReducer = (state = { user: { isAuthenticated: false } }) => state;

const renderComponent = (isAuthenticated: boolean) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: {
        isAuthenticated,
      },
    },
  });

  return render(
    <Provider store={store}>
      <AuthInitializer>
        <Dashboard />
      </AuthInitializer>
    </Provider>
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  it('should open DiaryModal when button is clicked', () => {
    renderComponent(true);

    expect(screen.queryByTestId('mock-diary-modal')).toBeNull();

    fireEvent.click(screen.getByText('Añadir registro'));

    expect(screen.getByTestId('mock-diary-modal')).toBeInTheDocument();
  });
});
