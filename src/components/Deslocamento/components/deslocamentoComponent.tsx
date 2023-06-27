import React, { useMemo, useState, useEffect } from 'react';
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
import { AddDeslocButton, HeaderButtons } from './styleDeslocamento';

export interface DeslocamentoProps {
  checkList: string;
  fimDeslocamento: string;
  id: number;
  idCliente: number;
  idCondutor: number;
  idVeiculo: number;
  inicioDeslocamento: string;
  kmFinal: null;
  kmInicial: number;
  motivo: string;
  observacao: string;
}

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
    clients,
    vehicles,
    conductors,
    checklist,
    handleChecklist,
  } = props;
  const [isOpen, setIsOpen] = useState('');

  const selectDeslocamento = (id: string, type: string) => {
    handleSelectDeslocamento(id);
    setIsOpen(type);
  };

  const conductorsData = useMemo(() => {
    return deslocamentos?.map((desloc: any) => {
      return {
        ...desloc,
        inicioDeslocamento: moment(desloc.inicioDeslocamento).format('LLL'),
        fimDeslocamento: moment(desloc.inicioDeslocamento).format('LLL'),
        actions: (
          <ActionsWrapper>
            <ActionIconComponent
              action={() => {
                selectDeslocamento(desloc?.id, 'View');
              }}
              icon={<VisibilityIcon />}
              title="Visualizar"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectDeslocamento(desloc?.id, 'Remove');
              }}
              icon={<DeleteForeverIcon />}
              title="Remover"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectDeslocamento(desloc?.id, 'Edit');
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

  useEffect(() => {
    console.log('conductorsData', conductorsData); //TODO remove log
  }, [conductorsData]);

  return (
    <ClientWrapper>
      <HeaderButtons
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <AddDeslocButton onClick={() => setIsOpen('Create')}>
          Iniciar Deslocamento
        </AddDeslocButton>
        <AddDeslocButton
          onClick={() => setIsOpen('Create')}
          color="secondary"
          sx={{
            marginLeft: { xs: 0, sm: '25px' },
            marginTop: { xs: '25px', sm: 0 },
          }}
        >
          Encerrar Deslocamento
        </AddDeslocButton>
      </HeaderButtons>

      <CustomizedTable
        columns={tableColumns}
        rows={conductorsData}
        onSelect={handleSelectDeslocamento}
      />

      <CustomModal
        isOpen={['Create', 'Edit', 'View'].includes(isOpen)}
        title="Adicionar novo condutor"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <DeslocamentoForm
          {...{ loading, selectedDeslocamento, resetSelectedConductor }}
          clientOptions={clients}
          conductorOptions={conductors}
          vehicleOptions={vehicles}
          checklistOptions={checklist}
          handleChecklist={handleChecklist}
          submit={isOpen === 'Create' ? submit : edit}
          handleClose={() => setIsOpen('')}
          type={isOpen}
        />
      </CustomModal>

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
    key: 'observacao',
    label: 'Observcões',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];
