import React, { useMemo, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { ActionsWrapper } from '../../Condutors/components/styleCondutors';
import { ActionIconComponent } from '@/src/utils/utils';
import {
  AddClientButton,
  ClientWrapper,
} from '../../Client/components/styleClient';
import CustomizedTable from '../../elements/Table/Table';
import ConfirmationModal from '../../elements/Modal/confirmationModal';
import CustomModal from '../../elements/Modal/modal';
import DeslocamentoForm from './deslocamentoForm';

const DeslocamentoComponent = (props: any) => {
  const {
    deslocamentos,
    handleSelectDeslocamento,
    deleteDeslocamento,
    selectedDeslocamento,
    resetSelectedConductor,
    loading,
    submit,
    edit,
  } = props;
  const [isOpen, setIsOpen] = useState('');

  const selectDeslocamento = (id: string, type: string) => {
    handleSelectDeslocamento(id);
    setIsOpen(type);
  };

  const conductorsData = useMemo(() => {
    return deslocamentos?.map((conductor: any) => {
      return {
        ...conductor,
        vencimentoHabilitacao: moment(conductor.vencimentoHabilitacao).format(
          'LL',
        ),
        actions: (
          <ActionsWrapper>
            <ActionIconComponent
              action={() => {
                console.log(conductor?.id, 'View');
              }}
              icon={<VisibilityIcon />}
              title="Visualizar"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                console.log(conductor?.id, 'Remove');
              }}
              icon={<DeleteForeverIcon />}
              title="Remover"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                console.log(conductor?.id, 'Edit');
              }}
              icon={<ModeEditOutlineIcon />}
              title="Editar"
              placement="top"
            />
          </ActionsWrapper>
        ),
      };
    });
  }, [deslocamentos]);

  return (
    <ClientWrapper>
      <AddClientButton onClick={() => setIsOpen('Create')}>
        Adicionar Condutor
      </AddClientButton>

      {/* <CustomizedTable
        columns={tableColumns}
        rows={conductorsData}
        onSelect={selectDeslocamento}
      /> */}

      {/* <CustomModal
        isOpen={['Create', 'Edit', 'View'].includes(isOpen)}
        title="Adicionar novo condutor"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <DeslocamentoForm
          {...{ loading, selectedDeslocamento, resetSelectedConductor }}
          clientOptions={}
          conductorOptions={}
          vehicleOptions={}
          submit={isOpen === 'Create' ? submit : edit}
          handleClose={() => setIsOpen('')}
          type={isOpen}
        />
      </CustomModal> */}

      <ConfirmationModal
        isOpen={['Remove'].includes(isOpen)}
        onClose={() => setIsOpen('')}
        onConfirm={async () => {
          await deleteDeslocamento(parseInt(selectedDeslocamento?.id));
          resetSelectedConductor();
          setIsOpen('');
        }}
        title={`Você irá remover o condutor "${selectedDeslocamento?.nome}"`}
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </ClientWrapper>
  );
};

export default DeslocamentoComponent;

const tableColumns = [
  {
    key: 'cliente',
    label: 'Cliente',
  },
  {
    key: 'condutor',
    label: 'Condutor',
  },
  {
    key: 'kmInicial',
    label: 'KM Inicial',
  },
  {
    key: 'kmFinal',
    label: 'KM Final',
  },
  {
    key: 'inicioDeslocamento',
    label: 'Início do deslocamento',
  },
  {
    key: 'fimDeslocamento',
    label: 'Fim do deslocamento',
  },
  {
    key: 'checkList',
    label: 'Checklist',
  },
  {
    key: 'motivo',
    label: 'Motivo',
  },
  {
    key: 'observcoes',
    label: 'Observcões',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];
