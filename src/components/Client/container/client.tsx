import React from 'react';
import ClientesComponent from '../components/clientComponent';
import api from '@/src/api/buscaCep';

const Client = () => {
  const getUserLocationData = async (cep: string) => {
    const data = await api
      .get(`${cep}/json`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('data', data); //TODO remove logs
    return data;
  };

  return <ClientesComponent {...{ getUserLocationData }} />;
};

export default Client;
