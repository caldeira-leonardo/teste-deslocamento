import React, { useState, useEffect } from 'react';
import VehiclesComponent from '../components/vehiclesComponent';
import { VehiclesProps } from '../components/vehiclesForm';
import {
  deleteVehiclesData,
  getVehiclesData,
  patchVehiclesData,
  postVehiclesData,
} from '@/src/api/Deslocamento/vehicle';

const Vehicles = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<VehiclesProps[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehiclesProps>();

  const resetSelectVehicle = () =>
    setSelectedVehicle({
      anoFabricacao: 0,
      id: '',
      kmAtual: 0,
      marcaModelo: '',
      placa: '',
    });

  const submit = async (values: VehiclesProps) => {
    await postVehiclesData(values);
    getVehicles();
  };

  const edit = async (values: VehiclesProps) => {
    await patchVehiclesData(values);
    resetSelectVehicle();
    getVehicles();
  };

  const getVehicles = async () => {
    const data = await getVehiclesData();
    setVehicles(data);
  };

  const handleSelectVehicle = (vehicleId: string | number) => {
    const vehicleSelected = vehicles.filter((vehicle) => {
      return vehicle.id === vehicleId;
    })[0];
    setSelectedVehicle(vehicleSelected);
  };

  const handleDeleteVehicle = async (clientId: string | number) => {
    await deleteVehiclesData(clientId);
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <VehiclesComponent
      {...{
        vehicles,
        resetSelectVehicle,
        submit,
        edit,
        handleSelectVehicle,
        handleDeleteVehicle,
        loading,
        selectedVehicle,
      }}
    />
  );
};

export default Vehicles;
