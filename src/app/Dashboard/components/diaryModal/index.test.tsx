import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DiaryModal } from './index';

describe('DiaryModal', () => {
  let consoleErrorSpy: jest.SpyInstance;

  const setup = (isModalOpen = true, setIsModalOpen = jest.fn()) => {
    render(
      <DiaryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    );
    return { setIsModalOpen };
  };

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders all numeric inputs and total', () => {
    setup();
    expect(screen.getByTestId('cash-input')).toBeInTheDocument();
    expect(screen.getByTestId('credit-card-input')).toBeInTheDocument();
    expect(screen.getByTestId('expenses-input')).toBeInTheDocument();
    expect(screen.getByTestId('total-input')).toBeInTheDocument();
  });

  it('updates cash input and reflects in total', () => {
    setup();
    const cashInput = screen.getByTestId('cash-input') as HTMLInputElement;
    fireEvent.change(cashInput, { target: { value: '100' } });
    expect(cashInput.value).toBe('100');
    expect((screen.getByTestId('total-input') as HTMLInputElement).value).toBe(
      '100'
    );
  });

  it('updates credit card input and reflects in total', () => {
    setup();
    const creditCardInput = screen.getByTestId(
      'credit-card-input'
    ) as HTMLInputElement;
    fireEvent.change(creditCardInput, { target: { value: '50' } });
    expect(creditCardInput.value).toBe('50');
    expect((screen.getByTestId('total-input') as HTMLInputElement).value).toBe(
      '50'
    );
  });

  it('updates expenses input and reflects in total', () => {
    setup();
    const cashInput = screen.getByTestId('cash-input') as HTMLInputElement;
    const creditCardInput = screen.getByTestId(
      'credit-card-input'
    ) as HTMLInputElement;
    const expensesInput = screen.getByTestId(
      'expenses-input'
    ) as HTMLInputElement;

    fireEvent.change(cashInput, { target: { value: '100' } });
    fireEvent.change(creditCardInput, { target: { value: '50' } });
    fireEvent.change(expensesInput, { target: { value: '30' } });

    expect(expensesInput.value).toBe('30');
    expect((screen.getByTestId('total-input') as HTMLInputElement).value).toBe(
      '120'
    );
  });

  it('resets values and closes modal on handleCloseModal', () => {
    const setIsModalOpen = jest.fn();
    setup(true, setIsModalOpen);

    const cashInput = screen.getByTestId('cash-input') as HTMLInputElement;
    const creditCardInput = screen.getByTestId(
      'credit-card-input'
    ) as HTMLInputElement;
    const expensesInput = screen.getByTestId(
      'expenses-input'
    ) as HTMLInputElement;

    fireEvent.change(cashInput, { target: { value: '100' } });
    fireEvent.change(creditCardInput, { target: { value: '50' } });
    fireEvent.change(expensesInput, { target: { value: '30' } });

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);

    expect(cashInput.value).toBe('');
    expect(creditCardInput.value).toBe('');
    expect(expensesInput.value).toBe('');
    expect((screen.getByTestId('total-input') as HTMLInputElement).value).toBe(
      '0'
    );
  });

  it('handles empty or non-numeric input by setting value to 0 and updating total', () => {
    setup();
    const cashInput = screen.getByTestId('cash-input') as HTMLInputElement;
    const creditCardInput = screen.getByTestId(
      'credit-card-input'
    ) as HTMLInputElement;
    const expensesInput = screen.getByTestId(
      'expenses-input'
    ) as HTMLInputElement;
    const totalInput = screen.getByTestId('total-input') as HTMLInputElement;

    fireEvent.change(cashInput, { target: { value: '100' } });
    fireEvent.change(creditCardInput, { target: { value: '50' } });
    fireEvent.change(expensesInput, { target: { value: '30' } });
    expect(totalInput.value).toBe('120');

    fireEvent.change(cashInput, { target: { value: '' } });

    expect(totalInput.value).toBe('20');

    fireEvent.change(creditCardInput, { target: { value: 'invalid' } });

    expect(totalInput.value).toBe('-30');
  });

  it('shows empty string for zero values in inputs', () => {
    setup();
    expect((screen.getByTestId('cash-input') as HTMLInputElement).value).toBe(
      ''
    );
    expect(
      (screen.getByTestId('credit-card-input') as HTMLInputElement).value
    ).toBe('');
    expect(
      (screen.getByTestId('expenses-input') as HTMLInputElement).value
    ).toBe('');
  });
});
