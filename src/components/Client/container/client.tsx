import React, { useState, useEffect } from 'react';
import ClientesComponent from '../components/clientComponent';
import buscaCepApi from '@/src/api/buscaCep';
import { ClientProps } from '../components/clientForm';
import {
  deleteClientsData,
  getClientsData,
  postClientsData,
} from '@/src/api/Deslocamento/clients';

const Client = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProps>();

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

  const submit = async (values: ClientProps) => {
    postClientsData(values);
    getClients();
  };

  const getClients = async () => {
    const clientsData = await getClientsData();
    setClients(() => clientsData.map((client: any) => client));
  };

  const handleSelectClient = (clientId: string | number) => {
    const clientSelected = clients.filter((client) => client.id == clientId)[0];
    setSelectedClient(clientSelected);
  };

  const handleDeleteClient = async (clientId: string | number) => {
    console.log('entrou aqui', clientId); //TODO remove logs
    await deleteClientsData(clientId);
    getClients();
  };

  useEffect(() => {
    getClients();
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
      }}
    />
  );
};

export default Client;
