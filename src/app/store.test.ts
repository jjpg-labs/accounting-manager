import { store } from './store';

describe('store', () => {
  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('should have a dispatch function', () => {
    expect(typeof store.dispatch).toBe('function');
  });

  it('should have a getState function', () => {
    expect(typeof store.getState).toBe('function');
  });

  it('should have user reducer in state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('user');
  });

  it('AppDispatch type should match store.dispatch', () => {
    type AppDispatch = typeof store.dispatch;

    expect(typeof store.dispatch).toBe('function');
  });
});
