import React, { useState, useMemo } from 'react';
import {
  ActionsWrapper,
  AddClientButton,
  ClientWrapper,
} from '../../Client/components/styleClient';
import CustomizedTable from '../../elements/Table/Table';
import { ActionIconComponent } from '@/src/utils/utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConfirmationModal from '../../elements/Modal/confirmationModal';
import CustomModal from '../../elements/Modal/modal';
import VehicleForm, { VehiclesProps } from './vehiclesForm';

interface VehiclesComponentProps {
  loading: boolean;
  submit(values: VehiclesProps): void;
  edit(values: VehiclesProps): void;
  handleSelectVehicle(id: string): void;
  handleDeleteVehicle(id: string): void;
  vehicles?: VehiclesProps[];
  selectedVehicle?: VehiclesProps;
  resetSelectVehicle(): void;
}

const VehiclesComponent = (props: VehiclesComponentProps) => {
  const {
    vehicles,
    handleSelectVehicle,
    selectedVehicle,
    submit,
    edit,
    loading,
    handleDeleteVehicle,
    resetSelectVehicle,
  } = props;
  const [isOpen, setIsOpen] = useState<string>('');

  const deleteClient = async (id: string) => {
    await handleDeleteVehicle(id);
    setIsOpen('');
  };

  const selectVehicle = (id: string, type: string) => {
    handleSelectVehicle(id);
    setIsOpen(type);
  };

  const vehiclesData = useMemo(() => {
    return vehicles?.map((vehicle: any) => {
      return {
        ...vehicle,
        actions: (
          <ActionsWrapper>
            <ActionIconComponent
              action={() => {
                selectVehicle(String(vehicle?.id), 'View');
              }}
              icon={<VisibilityIcon />}
              title="Visualizar"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectVehicle(String(vehicle?.id), 'Remove');
              }}
              icon={<DeleteForeverIcon />}
              title="Remover"
              placement="top"
            />
            <ActionIconComponent
              action={() => {
                selectVehicle(String(vehicle?.id), 'Edit');
              }}
              icon={<ModeEditOutlineIcon />}
              title="Editar"
              placement="top"
            />
          </ActionsWrapper>
        ),
      };
    });
  }, [vehicles]);

  return (
    <ClientWrapper>
      <AddClientButton onClick={() => setIsOpen('Create')}>
        Adicionar Veículo
      </AddClientButton>

      <CustomizedTable
        columns={tableColumns}
        rows={vehiclesData}
        onSelect={handleSelectVehicle}
      />

      <CustomModal
        isOpen={['Create', 'Edit', 'View'].includes(isOpen)}
        title="Adicionar novo cliente"
        onCancel={() => setIsOpen('')}
        onClose={() => setIsOpen('')}
      >
        <VehicleForm
          {...{ loading, selectedVehicle, resetSelectVehicle }}
          submit={isOpen === 'Create' ? submit : edit}
          handleClose={() => setIsOpen('')}
          type={isOpen}
        />
      </CustomModal>

      <ConfirmationModal
        isOpen={['Remove'].includes(isOpen)}
        onClose={() => setIsOpen('')}
        onConfirm={() => {
          deleteClient(String(selectedVehicle?.id));
          setIsOpen('');
        }}
        title={`Você irá remover o veículo ${selectedVehicle?.marcaModelo}`}
        description="Você tem certeza de que irá continuar com esta ação ? "
      />
    </ClientWrapper>
  );
};

export default VehiclesComponent;

const tableColumns = [
  {
    key: 'placa',
    label: 'Placa',
  },
  {
    key: 'marcaModelo',
    label: 'Marca/Modelo',
  },
  {
    key: 'anoFabricacao',
    label: 'Ano de fabricação',
  },
  {
    key: 'kmAtual',
    label: 'KM atual',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];
