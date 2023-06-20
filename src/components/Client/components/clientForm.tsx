import React from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import { ClientFormWrapper } from './styleClient';

interface ClientFormProps {
  client?: ClientProps;
  submit(values: ClientProps): void;
}

interface ClientProps {
  nome: string;
  numeroDocumento: string;
  tipoDocumento: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

const ClientForm = (props: ClientFormProps) => {
  const { submit } = props;
  const formik = useFormik<ClientProps>({
    initialValues: {
      nome: '',
      numeroDocumento: 'string',
      tipoDocumento: 'string',
      logradouro: 'string',
      numero: 'string',
      bairro: 'string',
      cidade: 'string',
      uf: 'string',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo obligatorio'),
      numeroDocumento: Yup.string().required('Campo obligatorio'),
      tipoDocumento: Yup.string().required('Campo obligatorio'),
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

  return (
    <ClientFormWrapper>
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
        label="Logradouro"
        variant="outlined"
        color="secondary"
        fullWidth
        id="logradouro"
        formik={formik}
      />
      <Input
        label="Numero"
        variant="outlined"
        color="secondary"
        fullWidth
        id="numero"
        formik={formik}
      />
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
  );
};

export default ClientForm;
