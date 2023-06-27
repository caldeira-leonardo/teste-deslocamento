import React, { useEffect, useRef, useState } from 'react';
import DeslocamentoComponent, {
  DeslocamentoProps,
} from '../components/deslocamentoComponent';
import { ClientProps } from '../../Client/components/clientForm';
import { ConductorProps } from '../../Condutors/components/condutorsForm';
import { VehiclesProps } from '../../Vehicles/components/vehiclesForm';
import { getClientsData } from '@/src/api/Deslocamento/clients';
import { getVehiclesData } from '@/src/api/Deslocamento/vehicle';
import { getConductorData } from '@/src/api/Deslocamento/conductor';
import { getDeslocamentoData } from '@/src/api/Deslocamento/deslocamento';

const Deslocamento = () => {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesProps[]>([]);
  const [conductors, setConductors] = useState<ConductorProps[]>([]);
  const [deslocamentos, setDeslocamentos] = useState<DeslocamentoProps>();
  const [selectedDeslocamento, setSelectedDeslocamento] = useState(false);
  const [checklist, setChecklist] = useState<
    {
      checked: boolean;
      label: string;
      key: number;
    }[]
  >([
    {
      key: 0,
      checked: false,
      label: 'Freios',
    },
    {
      key: 1,
      checked: false,
      label: 'Documentos',
    },
    {
      key: 2,
      checked: false,
      label: 'Óleo',
    },
    {
      key: 3,
      checked: false,
      label: 'Combustível',
    },
  ]);
  const wasCalled = useRef(false);

  const handleChecklist = (item: string) => {
    //melhorar isso
    setChecklist((values) => {
      let itemFinded = false;
      const newValues = values.map((value) => {
        let newItem: any = {};
        if (value.label === item) {
          itemFinded = true;
          newItem = {
            key: value.key,
            checked: !value.checked,
            label: value.label,
          };
        } else newItem = value;
        return newItem;
      });
      if (!itemFinded)
        newValues.push({
          key: values.length,
          checked: true,
          label: item,
        });

      return [...newValues];
    });
  };

  const handleSelectDeslocamento = (clientId: string | number) => {
    setSelectedDeslocamento(false);
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

  const getDeslocamentos = async () => {
    const deslocamentosData = await getDeslocamentoData();
    setDeslocamentos(deslocamentosData);
  };

  useEffect(() => {
    if (!wasCalled.current) {
      getClients();
      getVehicles();
      getConductors();
      getDeslocamentos();
      wasCalled.current = true;
    }
  }, []);

  return (
    <DeslocamentoComponent
      {...{
        handleSelectDeslocamento,
        clients,
        vehicles,
        conductors,
        checklist,
        handleChecklist,
        deslocamentos,
        selectedDeslocamento,
      }}
    />
  );
};

export default Deslocamento;
