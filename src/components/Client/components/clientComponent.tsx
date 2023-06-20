import React from 'react';
import ConfirmationModal from '@/src/components/elements/Modal/ConfirmationModal';
import Button from '@/src/components/elements/Button/Button';

const ClientesComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Você irá remover os dados"
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </div>
  );
};

export default ClientesComponent;
