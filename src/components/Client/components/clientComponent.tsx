import React, { useMemo, useState, useEffect } from 'react';
import ConfirmationModal from '@/src/components/elements/Modal/confirmationModal';
import CustomModal from '@/src/components/elements/Modal/modal';
import CustomizedTable from '@/src/components/elements/Table/Table';
import ClientForm, { ClientProps, RespondeCepProps } from './clientForm';
import { ActionsWrapper, AddClientButton, ClientWrapper } from './styleClient';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ActionIconComponent } from '@/src/utils/utils';

interface ClientesComponentProps {
  getUserLocationData(cep: string): RespondeCepProps;
  loading: boolean;
  submit(values: ClientProps): void;
  edit(values: ClientProps): void;
  handleSelectClient(id: string): void;
  handleDeleteClient(id: string): void;
  clients?: ClientProps[];
  selectedClient?: ClientProps;
  resetSelectUser(): void;
}

const ClientesComponent = (props: ClientesComponentProps) => {
  const {
    getUserLocationData,
    loading,
    submit,
    clients,
    handleSelectClient,
    handleDeleteClient,
    selectedClient,
    edit,
    resetSelectUser,
  } = props;
  const [isOpen, setIsOpen] = useState<string>('');

  const deleteClient = async (id: string) => {
    await handleDeleteClient(id);
    setIsOpen('');
  };

  const selectClient = (id: string, type: string) => {
    handleSelectClient(id);
    setIsOpen(type);
  };

  const clientsData = useMemo(() => {
    return clients?.map((client) => {
      return {
        ...client,
        actions: (
          <ActionsWrapper>
            <ActionIconComponent
              action={() => {
                selectClient(String(client?.id), 'View');
              }}
              icon={<VisibilityIcon />}
              title="Visualizar"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectClient(String(client?.id), 'Remove');
              }}
              icon={<DeleteForeverIcon />}
              title="Remover"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectClient(String(client?.id), 'Edit');
              }}
              icon={<ModeEditOutlineIcon />}
              title="Editar"
              placement="top"
            />
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

      <CustomizedTable
        columns={tableColumns}
        rows={clientsData}
        onSelect={handleSelectClient}
      />

      <CustomModal
        isOpen={['Create', 'Edit', 'View'].includes(isOpen)}
        title="Adicionar novo cliente"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <ClientForm
          {...{ getUserLocationData, loading, selectedClient, resetSelectUser }}
          submit={isOpen === 'Create' ? submit : edit}
          handleClose={() => setIsOpen('')}
          type={isOpen}
        />
      </CustomModal>
      <ConfirmationModal
        isOpen={['Remove'].includes(isOpen)}
        onClose={() => setIsOpen('')}
        onConfirm={() => deleteClient(String(selectedClient?.id))}
        title={`Você irá remover o cliente ${selectedClient?.nome}`}
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </ClientWrapper>
  );
};

export default ClientesComponent;

const tableColumns = [
  {
    key: 'nome',
    label: 'Nome',
  },
  {
    key: 'numeroDocumento',
    label: 'Numero do documento',
  },
  {
    key: 'tipoDocumento',
    label: 'Tipo do documento',
  },
  {
    key: 'logradouro',
    label: 'Logradouro',
  },
  {
    key: 'numero',
    label: 'Número',
  },
  {
    key: 'bairro',
    label: 'Bairro',
  },
  {
    key: 'cidade',
    label: 'Cidade',
  },
  {
    key: 'uf',
    label: 'UF',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];
