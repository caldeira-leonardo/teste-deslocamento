import React, { useState, useEffect, useRef } from 'react';
import ClientesComponent from '../components/clientComponent';
import buscaCepApi from '@/src/api/buscaCep';
import { ClientProps } from '../components/clientForm';
import {
  deleteClientsData,
  getClientsData,
  patchClientsData,
  postClientsData,
} from '@/src/api/Deslocamento/clients';

const Client = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProps>();
  const wasCalled = useRef(false);

  const getUserLocationData: any = async (cep: string) => {
    const data = await buscaCepApi
      .get(`${cep}/json`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  const resetSelectUser = () =>
    setSelectedClient({
      nome: '',
      numeroDocumento: '',
      tipoDocumento: '',
      bairro: '',
      cep: '',
      cidade: '',
      id: '',
      logradouro: '',
      numero: '',
      uf: '',
    });

  const submit = async (values: ClientProps) => {
    await postClientsData(values);
    getClients();
  };

  const edit = async (values: ClientProps) => {
    await patchClientsData(values);
    resetSelectUser();
    getClients();
  };

  const getClients = async () => {
    const clientsData = await getClientsData();
    setClients(() => clientsData.map((client: any) => client));
  };

  const handleSelectClient = (clientId: string | number) => {
    const clientSelected = clients.filter((client) => {
      return client.id === clientId;
    })[0];
    setSelectedClient(clientSelected);
  };

  const handleDeleteClient = async (clientId: string | number) => {
    await deleteClientsData(clientId);
    getClients();
  };

  useEffect(() => {
    if (!wasCalled.current) {
      getClients();
      wasCalled.current = true;
    }
    console.log('wasCalled.current', wasCalled.current); //TODO remove logs
  }, []);

  return (
    <ClientesComponent
      {...{
        getUserLocationData,
        loading,
        submit,
        clients,
        handleSelectClient,
        selectedClient,
        handleDeleteClient,
        edit,
        resetSelectUser,
      }}
    />
  );
};

export default Client;
