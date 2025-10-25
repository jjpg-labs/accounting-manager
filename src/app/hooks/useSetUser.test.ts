import { useSetUser } from './useSetUser';
import { setUser } from '@/features/user/userSlice';
import { renderHook, act } from '@testing-library/react';

let dispatchMock = jest.fn();

jest.mock('@/features/user/userSlice', () => ({
  setUser: jest.fn((user) => ({ type: 'setUser', payload: user })),
  setInitializationFailed: jest.fn(() => ({ type: 'setInitializationFailed' })),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatchMock,
}));

describe('useSetUser', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('dispatches setUser when fetch is successful', async () => {
    const userData = { id: 1, name: 'Test User' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(userData),
    } as any);

    const { result } = renderHook(() => useSetUser());

    await act(async () => {
      result.current();
    });

    expect(fetch).toHaveBeenCalledWith('/api/auth/me', { method: 'GET' });
    expect(setUser).toHaveBeenCalledWith(userData);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'setUser',
      payload: userData,
    });
  });

  it('dispatches setInitializationFailed when fetch response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as any);

    const { result } = renderHook(() => useSetUser());

    await act(async () => {
      result.current();
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'setInitializationFailed',
    });
  });

  it('dispatches setInitializationFailed when fetch throws error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useSetUser());

    await act(async () => {
      result.current();
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'setInitializationFailed',
    });
  });
});
