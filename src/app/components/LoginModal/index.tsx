import { Form } from '@/app/components/Form';

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
}: LoginModalProps) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Form
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      title="Login"
    >
      <div>Login Modal Content</div>
    </Form>
  );
};
