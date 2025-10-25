import { useSelector } from 'react-redux';
import { useAppSelector } from './useAppSelector';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('useAppSelector', () => {
  it('should be the same as useSelector', () => {
    expect(useAppSelector).toBe(useSelector);
  });
});
