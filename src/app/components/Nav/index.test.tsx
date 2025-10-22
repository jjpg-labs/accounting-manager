import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './';
const ctx = require('@/app/context/LoginModalContext');

const mockSetIsLoginModalOpen = jest.fn();

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      const { src, alt, width, height } = props;
      return <img src={src} alt={alt} width={width} height={height} />;
    },
  };
});

jest.mock('@/app/context/LoginModalContext', () => ({
  useLoginModal: jest.fn(),
}));

beforeEach(() => {
  (ctx.useLoginModal as jest.Mock).mockReturnValue({
    setIsLoginModalOpen: mockSetIsLoginModalOpen,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Nav', () => {
  it('renders the login image button', () => {
    render(<Nav />);
    const img = screen.getByAltText('Login') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/notLogged.svg');
    expect(img.width).toBe(40);
    expect(img.height).toBe(40);
  });

  it('opens the login modal when the button is clicked', () => {
    render(<Nav />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetIsLoginModalOpen).toHaveBeenCalledTimes(1);
    expect(mockSetIsLoginModalOpen).toHaveBeenCalledWith(true);
  });
});
