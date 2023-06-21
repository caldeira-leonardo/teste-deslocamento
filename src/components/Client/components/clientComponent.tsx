import React from 'react';
import ConfirmationModal from '@/src/components/elements/Modal/confirmationModal';
import Button from '@/src/components/elements/Button/Button';
import CustomModal from '../../elements/Modal/modal';
import ClientForm, { ClientProps, RespondeCepProps } from './clientForm';

interface ClientesComponentProps {
  getUserLocationData(cep: string): RespondeCepProps;
  loading: boolean;
  submit(values: ClientProps): void;
}

const ClientesComponent = (props: ClientesComponentProps) => {
  const { getUserLocationData, loading, submit } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Button onClick={() => setIsConfirmationOpen(true)}>
        Open Confirmation modal
      </Button>
      <a href="/link">asdasdasdad</a>

      <CustomModal
        isOpen={isOpen}
        title="Adicionar novo cliente"
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        <ClientForm
          {...{ getUserLocationData, loading, submit }}
          handleClose={() => setIsOpen(false)}
        />
      </CustomModal>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => setIsConfirmationOpen(false)}
        title="Você irá remover os dados"
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </div>
  );
};

export default ClientesComponent;
