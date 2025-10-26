import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from './page';
import AuthInitializer from './components/AuthInitializer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

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
        <Page />
      </AuthInitializer>
    </Provider>
  );
};

global.fetch = jest.fn();

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  it('should render home page correctly', () => {
    renderComponent(true);

    expect(
      screen.getByRole('link', { name: /Añadir registro/i })
    ).toBeInTheDocument();
  });
});
