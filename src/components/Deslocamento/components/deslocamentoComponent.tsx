import React, { useMemo, useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { ActionsWrapper } from '../../Condutors/components/styleCondutors';
import { ActionIconComponent } from '@/src/utils/utils';
import { ClientWrapper } from '../../Client/components/styleClient';
import CustomizedTable from '../../elements/Table/Table';
import ConfirmationModal from '../../elements/Modal/confirmationModal';
import CustomModal from '../../elements/Modal/modal';
import DeslocamentoForm from './deslocamentoForm';
import { AddDeslocButton, HeaderButtons } from './styleDeslocamento';
import DeslocamentoUpdateForm from './deslocamentoUpdateForm';

export interface DeslocamentoProps {
  checkList: string;
  fimDeslocamento: string;
  id: number;
  idCliente: number;
  idCondutor: number;
  idVeiculo: number;
  inicioDeslocamento: string;
  kmFinal: number;
  kmInicial: number;
  motivo: string;
  observacao: string;
}

const DeslocamentoComponent = (props: any) => {
  const {
    deslocamentos,
    handleSelectDeslocamento,
    resetSelectedDeslocamento,
    deleteDeslocamento,
    selectedDeslocamento,
    loading,
    submit,
    clients,
    vehicles,
    conductors,
    edit,
    checklist,
    handleChecklist,
  } = props;
  const [isOpen, setIsOpen] = useState('');

  const selectDeslocamento = (id: string, type: string) => {
    handleSelectDeslocamento(id);
    setIsOpen(type);
  };

  const conductorsData = useMemo(() => {
    return deslocamentos?.map((desloc: any, i: number) => {
      const handleSelect = (id: any, options: any[]) => {
        return options.filter((item: any) => item.key === id)[0];
      };

      const selectedClient = handleSelect(desloc.idCliente, clients);
      const selectedConductor = handleSelect(desloc.idCondutor, conductors);
      const selectedVehicle = handleSelect(desloc.idVeiculo, vehicles);

      return {
        ...desloc,
        cliente: selectedClient?.label,
        condutor: selectedConductor?.label,
        veiculo: selectedVehicle?.label,
        inicioDeslocamento: moment(desloc.inicioDeslocamento).format('LLL'),
        fimDeslocamento: desloc.fimDeslocamento
          ? moment(desloc.fimDeslocamento).format('LLL')
          : '',
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
              data-testId={
                i === deslocamentos.length - 1 ? 'removerItemTabela' : ''
              }
            />
          </ActionsWrapper>
        ),
      };
    });
  }, [deslocamentos, clients, conductors, vehicles]);

  const handleCancelAction = () => {
    setIsOpen('');
    resetSelectedDeslocamento();
  };

  const handleDeslocamentosOptions = () => {
    const unfinishedDeslocaBasic = deslocamentos.filter(
      (item: DeslocamentoProps) => !item.fimDeslocamento,
    );

    const unfinishedDesloca = unfinishedDeslocaBasic.map(
      (item: DeslocamentoProps) => {
        const selectedClient = clients.filter(
          (user: any) => user.key === item.idCliente,
        )[0];
        const selectedConductor = conductors.filter(
          (user: any) => user.key === item.idCondutor,
        )[0];
        const selectedVehicle = vehicles.filter(
          (user: any) => user.key === item.idVeiculo,
        )[0];

        return {
          key: item.id,
          label: `${selectedClient?.label} | ${selectedConductor?.label} | ${selectedVehicle?.label}`,
        };
      },
    );

    return unfinishedDesloca;
  };

  return (
    <ClientWrapper>
      <HeaderButtons
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <AddDeslocButton
          onClick={() => setIsOpen('Create')}
          data-testid="iniciarDeslocamento"
        >
          Iniciar Deslocamento
        </AddDeslocButton>
        <AddDeslocButton
          onClick={() => setIsOpen('Update')}
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
        isOpen={['Create', 'View', 'Update'].includes(isOpen)}
        title={
          isOpen === 'Update'
            ? 'Encerrar deslocamento'
            : isOpen === 'Create'
              ? 'Adicionar novo deslocamento'
              : 'Deslocamento'
        }
        onCancel={() => handleCancelAction()}
        onClose={() => handleCancelAction()}
      >
        {isOpen !== 'Update' ? (
          <DeslocamentoForm
            {...{
              loading,
              selectedDeslocamento,
              handleSelectDeslocamento,
              resetSelectedDeslocamento,
            }}
            clientOptions={clients}
            conductorOptions={conductors}
            vehicleOptions={vehicles}
            checklistOptions={checklist}
            handleChecklist={handleChecklist}
            submit={submit}
            handleClose={() => handleCancelAction()}
            type={isOpen}
          />
        ) : (
          <DeslocamentoUpdateForm
            {...{
              loading,
              selectedDeslocamento,
              handleSelectDeslocamento,
              resetSelectedDeslocamento,
            }}
            submit={edit}
            handleClose={() => handleCancelAction()}
            deslocOptions={handleDeslocamentosOptions()}
            allDeslocamentos={deslocamentos}
          />
        )}
      </CustomModal>

      <ConfirmationModal
        isOpen={['Remove'].includes(isOpen)}
        onClose={() => handleCancelAction()}
        onConfirm={async () => {
          await deleteDeslocamento(parseInt(selectedDeslocamento?.id));
          handleCancelAction();
        }}
        title={`Você irá remover o deslocamento "${selectedDeslocamento?.id}"`}
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
    key: 'veiculo',
    label: 'Veículo',
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
