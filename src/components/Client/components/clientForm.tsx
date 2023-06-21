import React, { useMemo, useState, useEffect } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import { ClientFormWrapper, LogradouroWrapper } from './styleClient';
import api from '@/src/api/buscaCep';
import BottonButtons from '../../elements/Modal/bottomButtons';

interface ClientFormProps {
  selectedClient?: ClientProps;
  submit(values: ClientProps): void;
  getUserLocationData(cep: string): RespondeCepProps;
  handleClose(): void;
  type: string;
}

export interface ClientProps {
  id?: number | string;
  nome: string;
  numeroDocumento: string;
  tipoDocumento: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}

export interface RespondeCepProps {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

const ClientForm = (props: ClientFormProps) => {
  const {
    submit,
    getUserLocationData,
    handleClose,
    selectedClient,
    type,
  } = props;

  const formik = useFormik<ClientProps>({
    initialValues: {
      nome: selectedClient?.nome || '',
      numeroDocumento: selectedClient?.numeroDocumento || '',
      tipoDocumento: selectedClient?.tipoDocumento || '',
      cep: selectedClient?.cep || '',
      logradouro: selectedClient?.logradouro || '',
      numero: selectedClient?.numero || '',
      bairro: selectedClient?.bairro || '',
      cidade: selectedClient?.cidade || '',
      uf: selectedClient?.uf || '',
      id: selectedClient?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo obligatorio'),
      numeroDocumento: Yup.string()
        .matches(/^\d+$/, 'Digite somente números')
        .required('Campo obligatorio'),
      tipoDocumento: Yup.string().required('Campo obligatorio'),
      cep: Yup.string()
        .matches(/^\d+$/, 'Digite somente números')
        .max(10, 'Só é aceito 10 caracteres'),
      logradouro: Yup.string(),
      numero: Yup.string(),
      bairro: Yup.string(),
      cidade: Yup.string(),
      uf: Yup.string(),
    }),
    onSubmit: async (values) => {
      await submit(values);
      formik.resetForm();
      handleClose();
    },
  });

  const handleChangeLocation = (data: RespondeCepProps) => {
    formik.setFieldValue('logradouro', data?.logradouro);
    formik.setFieldValue('cidade', data?.localidade);
    formik.setFieldValue('uf', data?.uf);
    formik.setFieldValue('bairro', data?.bairro);
    formik.setFieldValue('cep', data?.cep?.replace('-', ''));
  };

  useMemo(async () => {
    if (formik.values.cep) {
      if (formik.values.cep.length > 8) return;
      const cepData = await getUserLocationData(formik.values.cep);
      if (cepData) handleChangeLocation(cepData);
    }
  }, [formik.values.cep]);

  return (
    <>
      <ClientFormWrapper sx={{ width: { md: '30vw' } }}>
        <Input
          label="Nome"
          variant="outlined"
          color="secondary"
          fullWidth
          id="nome"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Numero do documento"
          variant="outlined"
          color="secondary"
          fullWidth
          id="numeroDocumento"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Tipo do documento"
          variant="outlined"
          color="secondary"
          fullWidth
          id="tipoDocumento"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="CEP"
          variant="outlined"
          color="secondary"
          fullWidth
          id="cep"
          placeholder="somente números"
          formik={formik}
          disabled={type === 'View'}
        />
        <LogradouroWrapper sx={{ display: { md: 'grid', xs: 'block' } }}>
          <Input
            label="Logradouro"
            variant="outlined"
            color="secondary"
            fullWidth
            id="logradouro"
            formik={formik}
            disabled={type === 'View'}
            sx={{ gridArea: 'logradouro' }}
          />
          <Input
            label="Nº"
            variant="outlined"
            color="secondary"
            fullWidth
            id="numero"
            formik={formik}
            disabled={type === 'View'}
            sx={{ gridArea: 'numero', marginTop: { sm: '10px', md: 0 } }}
          />
        </LogradouroWrapper>
        <Input
          label="Bairro"
          variant="outlined"
          color="secondary"
          fullWidth
          id="bairro"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Cidade"
          variant="outlined"
          color="secondary"
          fullWidth
          id="cidade"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="UF"
          variant="outlined"
          color="secondary"
          fullWidth
          id="uf"
          formik={formik}
          disabled={type === 'View'}
        />
      </ClientFormWrapper>
      <BottonButtons
        onClose={handleClose}
        onConfirm={formik.handleSubmit}
        disabled={type === 'View'}
      />
    </>
  );
};

export default ClientForm;
