import React, { useMemo, useState } from 'react';
import ConfirmationModal from '@/src/components/elements/Modal/confirmationModal';
import CustomModal from '@/src/components/elements/Modal/modal';
import CustomizedTable from '@/src/components/elements/Table/Table';
import ClientForm, { ClientProps, RespondeCepProps } from './clientForm';
import {
  ActionIcon,
  ActionsWrapper,
  AddClientButton,
  ClientWrapper,
} from './styleClient';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface ClientesComponentProps {
  getUserLocationData(cep: string): RespondeCepProps;
  loading: boolean;
  submit(values: ClientProps): void;
  handleSelectClient(id: string): void;
  handleDeleteClient(id: string): void;
  clients?: ClientProps[];
}

const ClientesComponent = (props: ClientesComponentProps) => {
  const {
    getUserLocationData,
    loading,
    submit,
    clients,
    handleSelectClient,
    handleDeleteClient,
  } = props;
  const [isOpen, setIsOpen] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const clientsData = useMemo(() => {
    return clients?.map((client) => {
      return {
        ...client,
        actions: (
          <ActionsWrapper>
            <ActionIcon onClick={() => handleDeleteClient(String(client?.id))}>
              <DeleteForeverIcon />
            </ActionIcon>
            <ActionIcon onClick={() => handleSelectClient(String(client?.id))}>
              <ModeEditOutlineIcon />
            </ActionIcon>
          </ActionsWrapper>
        ),
      };
    });
  }, [clients]);

  return (
    <ClientWrapper>
      <AddClientButton onClick={() => setIsOpen('Create')}>
        Adicionar Cliente
      </AddClientButton>
      {/* <Button onClick={() => setIsConfirmationOpen(true)}>
        Open Confirmation modal
      </Button> */}

      <CustomizedTable
        columns={[
          'numeroDocumento',
          'tipoDocumento',
          'nome',
          'logradouro',
          'numero',
          'bairro',
          'cidade',
          'uf',
          'actions',
        ]}
        rows={clientsData}
        onSelect={handleSelectClient}
      />

      <CustomModal
        isOpen={['Create', 'Edit'].includes(isOpen)}
        title="Adicionar novo cliente"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <ClientForm
          {...{ getUserLocationData, loading, submit }}
          handleClose={() => setIsOpen('')}
        />
      </CustomModal>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => setIsConfirmationOpen(false)}
        title="Você irá remover os dados"
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </ClientWrapper>
  );
};

export default ClientesComponent;
