import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import { ClientFormWrapper, LogradouroWrapper } from './styleClient';
import api from '@/src/api/buscaCep';
import BottonButtons from '../../elements/Modal/bottomButtons';

interface ClientFormProps {
  client?: ClientProps;
  submit(values: ClientProps): void;
  getUserLocationData(cep: string): RespondeCepProps;
  handleClose(): void;
}

export interface ClientProps {
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
  const { submit, getUserLocationData, handleClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik<ClientProps>({
    initialValues: {
      nome: '',
      numeroDocumento: '',
      tipoDocumento: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo obligatorio'),
      numeroDocumento: Yup.string().required('Campo obligatorio'),
      tipoDocumento: Yup.string().required('Campo obligatorio'),
      cep: Yup.string().max(10),
      logradouro: Yup.string(),
      numero: Yup.string(),
      bairro: Yup.string(),
      cidade: Yup.string(),
      uf: Yup.string(),
    }),
    onSubmit: (values) => {
      submit(values);
      formik.resetForm();
    },
  });

  const handleChangeLocation = (data: RespondeCepProps) => {
    formik.setFieldValue('logradouro', data?.logradouro);
    formik.setFieldValue('cidade', data?.localidade);
    formik.setFieldValue('uf', data?.uf);
    formik.setFieldValue('bairro', data?.bairro);
    formik.setFieldValue('cep', data?.cep.replace('-', ''));
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
        />
        <Input
          label="Numero do documento"
          variant="outlined"
          color="secondary"
          fullWidth
          id="numeroDocumento"
          type="number"
          formik={formik}
        />
        <Input
          label="Tipo do documento"
          variant="outlined"
          color="secondary"
          fullWidth
          id="tipoDocumento"
          formik={formik}
        />
        <Input
          label="CEP"
          variant="outlined"
          color="secondary"
          fullWidth
          id="cep"
          placeholder="somente números"
          type="number"
          formik={formik}
        />
        <LogradouroWrapper sx={{ display: { md: 'grid', xs: 'block' } }}>
          <Input
            label="Logradouro"
            variant="outlined"
            color="secondary"
            fullWidth
            id="logradouro"
            formik={formik}
            sx={{ gridArea: 'logradouro' }}
          />
          <Input
            label="Nº"
            variant="outlined"
            color="secondary"
            fullWidth
            id="numero"
            formik={formik}
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
        />
        <Input
          label="Cidade"
          variant="outlined"
          color="secondary"
          fullWidth
          id="cidade"
          formik={formik}
        />
        <Input
          label="UF"
          variant="outlined"
          color="secondary"
          fullWidth
          id="uf"
          formik={formik}
        />
      </ClientFormWrapper>
      <BottonButtons onClose={handleClose} onConfirm={formik.handleSubmit} />
    </>
  );
};

export default ClientForm;
