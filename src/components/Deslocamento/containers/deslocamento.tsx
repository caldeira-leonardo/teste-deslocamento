import React, { useEffect, useRef, useState } from 'react';
import DeslocamentoComponent from '../components/deslocamentoComponent';
import { ClientProps } from '../../Client/components/clientForm';
import { ConductorProps } from '../../Condutors/components/condutorsForm';
import { VehiclesProps } from '../../Vehicles/components/vehiclesForm';
import { getClientsData } from '@/src/api/Deslocamento/clients';
import { getVehiclesData } from '@/src/api/Deslocamento/vehicle';
import { getConductorData } from '@/src/api/Deslocamento/conductor';

const Deslocamento = () => {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesProps[]>([]);
  const [conductors, setConductors] = useState<ConductorProps[]>([]);
  const [deslocamento, setDeslocamento] = useState(false);
  const wasCalled = useRef(false);

  const handleSelectDeslocamento = (clientId: string | number) => {
    setDeslocamento(false);
  };

  const getClients = async () => {
    const clientsData = await getClientsData();
    setClients(() =>
      clientsData.map((client: ClientProps) => ({
        key: client.id,
        label: client.nome,
      })),
    );
  };

  const getVehicles = async () => {
    const data = await getVehiclesData();
    setVehicles(() =>
      data.map((vehicle: VehiclesProps) => ({
        key: vehicle.id,
        label: vehicle.marcaModelo,
      })),
    );
  };

  const getConductors = async () => {
    const conductorsData = await getConductorData();
    setConductors(() =>
      conductorsData.map((conductor: ConductorProps) => ({
        key: conductor.id,
        label: conductor.nome,
      })),
    );
  };

  useEffect(() => {
    if (!wasCalled.current) {
      getClients();
      getVehicles();
      getConductors();
      wasCalled.current = true;
    }
  }, []);

  return (
    <DeslocamentoComponent
      {...{ handleSelectDeslocamento, clients, vehicles, conductors }}
    />
  );
};

export default Deslocamento;
