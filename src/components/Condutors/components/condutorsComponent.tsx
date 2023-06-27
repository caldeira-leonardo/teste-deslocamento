import React, { useMemo, useState } from 'react';
import {
  ActionsWrapper,
  AddClientButton,
  ClientWrapper,
} from '@/src/components/Client/components/styleClient';
import CustomizedTable from '@/src/components/elements/Table/Table';
import CustomModal from '@/src/components/elements/Modal/modal';
import ConfirmationModal from '@/src/components/elements/Modal/confirmationModal';
import { ActionIconComponent } from '@/src/utils/utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConductorForm from './condutorsForm';
import moment from 'moment';

const CondutorsComponent = (props: any) => {
  const {
    conductors,
    selectedConductor,
    deleteConductor,
    resetSelectedConductor,
    submit,
    edit,
    loading,
    handleSelectConductor,
  } = props;
  const [isOpen, setIsOpen] = useState('');

  const selectConductor = (id: string, type: string) => {
    handleSelectConductor(id);
    setIsOpen(type);
  };

  const conductorsData = useMemo(() => {
    return conductors?.map((conductor: any) => {
      return {
        ...conductor,
        vencimentoHabilitacao: moment(conductor.vencimentoHabilitacao).format(
          'LL',
        ),
        actions: (
          <ActionsWrapper>
            <ActionIconComponent
              action={() => {
                selectConductor(conductor?.id, 'View');
              }}
              icon={<VisibilityIcon />}
              title="Visualizar"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectConductor(conductor?.id, 'Remove');
              }}
              icon={<DeleteForeverIcon />}
              title="Remover"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectConductor(conductor?.id, 'Edit');
              }}
              icon={<ModeEditOutlineIcon />}
              title="Editar"
              placement="top"
            />
          </ActionsWrapper>
        ),
      };
    });
  }, [conductors]);

  return (
    <ClientWrapper>
      <AddClientButton onClick={() => setIsOpen('Create')}>
        Adicionar Condutor
      </AddClientButton>
      <CustomizedTable
        columns={tableColumns}
        rows={conductorsData}
        onSelect={handleSelectConductor}
        minWidth={880}
      />
      <CustomModal
        isOpen={['Create', 'Edit', 'View'].includes(isOpen)}
        title="Adicionar novo condutor"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <ConductorForm
          {...{ loading, selectedConductor, resetSelectedConductor }}
          submit={isOpen === 'Create' ? submit : edit}
          handleClose={() => setIsOpen('')}
          type={isOpen}
        />
      </CustomModal>

      <ConfirmationModal
        isOpen={['Remove'].includes(isOpen)}
        onClose={() => setIsOpen('')}
        onConfirm={async () => {
          await deleteConductor(parseInt(selectedConductor?.id));
          resetSelectedConductor();
          setIsOpen('');
        }}
        title={`Você irá remover o condutor "${selectedConductor?.nome}"`}
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </ClientWrapper>
  );
};

export default CondutorsComponent;

const tableColumns = [
  {
    key: 'nome',
    label: 'Nome',
  },
  {
    key: 'numeroHabilitacao',
    label: 'Numero da Habilitação',
  },
  {
    key: 'catergoriaHabilitacao', //na api tem um "r" a mais em "cateRgoria"
    label: 'Categoria da habilitação',
  },
  {
    key: 'vencimentoHabilitacao',
    label: 'Vencimento da habilitação',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];
