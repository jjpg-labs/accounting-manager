import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { LoginModalProvider, useLoginModal } from './LoginModalContext';
import LoginModal from '@/app/components/LoginModal';

jest.mock('@/app/components/LoginModal', () => {
  const MockedLoginModal = jest.fn(({ isOpen, isModalOpen, onClose }) => {
    const open = typeof isOpen !== 'undefined' ? isOpen : isModalOpen;
    if (!open) return null;
    return (
      <div data-testid="login-modal">
        <button data-testid="modal-close-button" onClick={onClose}>
          Close
        </button>
        Modal Content
      </div>
    );
  });

  return {
    __esModule: true,
    default: MockedLoginModal,
    LoginModal: MockedLoginModal,
  };
});

const MockLoginModal = LoginModal as jest.Mock;

describe('useLoginModal Hook', () => {
  const consoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('should throw an error when used outside LoginModalProvider', () => {
    const BadConsumer = () => {
      useLoginModal();
      return null;
    };

    expect(() => {
      render(<BadConsumer />);
    }).toThrow('useLoginModal must be used within a LoginModalProvider');
  });

  it('should return initial state (false) and a setter function', () => {
    let result: ReturnType<typeof useLoginModal> | undefined;

    const ContextChecker = () => {
      result = useLoginModal();
      return null;
    };

    render(
      <LoginModalProvider>
        <ContextChecker />
      </LoginModalProvider>
    );

    expect(result).toBeDefined();
    expect(result!.isLoginModalOpen).toBe(false);
    expect(typeof result!.setIsLoginModalOpen).toBe('function');
  });
});

describe('LoginModalProvider Behavior', () => {
  // Habilitado

  const TestConsumer = () => {
    const { isLoginModalOpen, setIsLoginModalOpen } = useLoginModal();
    return (
      <div data-testid="consumer-status">
        {isLoginModalOpen ? 'open' : 'closed'}
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children and LoginModal should NOT be in the document initially', () => {
    render(
      <LoginModalProvider>
        <TestConsumer />
        <div data-testid="app-content">App</div>
      </LoginModalProvider>
    );

    expect(screen.getByTestId('app-content')).toBeInTheDocument();
    expect(screen.getByTestId('consumer-status')).toHaveTextContent('closed');

    expect(MockLoginModal).toHaveBeenCalledTimes(1);
    const initialProps = MockLoginModal.mock.calls[0][0];
    expect(initialProps.isModalOpen).toBe(false);

    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();
  });

  it('should open the LoginModal when state is set to true', () => {
    let setIsLoginModalOpen: (value: boolean) => void;

    const ConsumerWithSetter = () => {
      const context = useLoginModal();
      setIsLoginModalOpen = context.setIsLoginModalOpen;
      return null;
    };

    render(
      <LoginModalProvider>
        <ConsumerWithSetter />
      </LoginModalProvider>
    );

    // El primer renderizado llamó al mock una vez (con isOpen=false),
    // pero el modal visible NO está en el DOM.
    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();

    // La actualización del estado debe estar envuelta en act
    act(() => {
      setIsLoginModalOpen(true);
    });

    // El segundo renderizado (al abrir el modal) debe haber ocurrido.
    expect(MockLoginModal).toHaveBeenCalledTimes(2);

    // El error estaba aquí, la prop correcta es 'isOpen'
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();

    const lastCallProps =
      MockLoginModal.mock.calls[MockLoginModal.mock.calls.length - 1][0];
    expect(lastCallProps.isModalOpen).toBe(true);
    expect(typeof lastCallProps.setIsModalOpen).toBe('function');
  });
});
