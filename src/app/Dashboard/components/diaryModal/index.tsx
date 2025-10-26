import { Form } from '@/app/components/Form';
import React, { forwardRef, useState } from 'react';

interface NumericInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
  value: number; // Añadido para input controlado
}

interface DiaryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const INPUT_CLASSES = 'border rounded-md p-2';

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ placeholder, onChange, testId, value }, ref) => {
    return (
      <input
        type="number"
        className={INPUT_CLASSES}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        data-testid={`${testId}-input`}
        value={value === 0 ? '' : value}
      />
    );
  }
);

export const DiaryModal = ({
  isModalOpen,
  setIsModalOpen,
}: DiaryModalProps) => {
  const [cash, setCash] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const totalNet = cash + creditCard - expenses;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCash(0);
    setCreditCard(0);
    setExpenses(0);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setter(value);
    };

  return (
    <Form
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={() => {}}
      title="Registro diario"
    >
      <NumericInput
        placeholder="Efectivo"
        onChange={handleInputChange(setCash)}
        value={cash}
        testId="cash"
      />
      <NumericInput
        placeholder="Tarjeta"
        onChange={handleInputChange(setCreditCard)}
        value={creditCard}
        testId="credit-card"
      />
      <NumericInput
        placeholder="Gastos"
        onChange={handleInputChange(setExpenses)}
        value={expenses}
        testId="expenses"
      />
      <input
        className={INPUT_CLASSES}
        value={totalNet}
        disabled={true}
        data-testid="total-input"
      />
    </Form>
  );
};
