import React, { useState } from 'react';
import ClientesComponent from '../components/clientComponent';
import buscaCepApi from '@/src/api/buscaCep';
import { ClientProps } from '../components/clientForm';
import deslocamentoApi from '@/src/api/deslocamento';

const Client = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    const data = await deslocamentoApi
      .post(`/Cliente`, values)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('retorno', data);
  };

  return <ClientesComponent {...{ getUserLocationData, loading, submit }} />;
};

export default Client;
