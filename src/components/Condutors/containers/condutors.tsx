import React, { useState, useEffect } from 'react';
import CondutoresComponent from '../components/condutorsComponent';
import { ConductorProps } from '../components/condutorsForm';
import {
  deleteConductorData,
  getConductorData,
  patchConductorData,
  postConductorData,
} from '@/src/api/Deslocamento/conductor';

const Condutors = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conductors, setConductors] = useState<ConductorProps[]>([]);
  const [selectedConductor, setSelectedConductor] = useState<ConductorProps>();

  const resetSelectedConductor = () => {
    setSelectedConductor({
      nome: '',
      catergoriaHabilitacao: '',
      numeroHabilitacao: '',
      id: '',
      vencimentoHabilitacao: new Date().toString(),
    });
  };

  const submit = async (values: ConductorProps) => {
    await postConductorData(values);
    getConductors();
  };

  const edit = async (values: ConductorProps) => {
    await patchConductorData(values);
    resetSelectedConductor();
    getConductors();
  };

  const getConductors = async () => {
    const conductorsData = await getConductorData();
    setConductors(() => conductorsData.map((Conductor: any) => Conductor));
  };

  const handleSelectConductor = (ConductorId: number) => {
    const conductorselected = conductors.filter((conductor) => {
      return conductor.id === ConductorId;
    })[0];

    setSelectedConductor(conductorselected);
  };

  const deleteConductor = async (clientId: number) => {
    await deleteConductorData(clientId);
    getConductors();
  };

  useEffect(() => {
    getConductors();
  }, []);

  return (
    <CondutoresComponent
      {...{
        handleSelectConductor,
        selectedConductor,
        conductors,
        resetSelectedConductor,
        submit,
        edit,
        deleteConductor,
      }}
    />
  );
};

export default Condutors;
