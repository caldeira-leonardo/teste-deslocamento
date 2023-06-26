import React, { useMemo, useState, useEffect } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import {
  ClientFormWrapper,
  LogradouroWrapper,
} from '../../Client/components/styleClient';

interface ClientFormProps {
  selectedVehicle?: VehiclesProps;
  submit(values: VehiclesProps): void;
  handleClose(): void;
  type: string;
  resetSelectVehicle(): void;
}

export interface VehiclesProps {
  id: number | string;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

const VehicleForm = (props: ClientFormProps) => {
  const {
    submit,
    handleClose,
    selectedVehicle,
    type,
    resetSelectVehicle,
  } = props;

  const formik = useFormik<VehiclesProps>({
    initialValues: {
      id: selectedVehicle?.id || '',
      placa: selectedVehicle?.placa || '',
      marcaModelo: selectedVehicle?.marcaModelo || '',
      anoFabricacao: selectedVehicle?.anoFabricacao || 0,
      kmAtual: selectedVehicle?.kmAtual || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      id: Yup.string(),
      placa: Yup.string()
        .required('Campo obrigatório')
        .max(7, 'Máximo de 7 caracteres')
        .matches(
          /[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{1}/,
          'Siga esse padrão: AAA1*34',
        ),
      marcaModelo: Yup.string(),
      anoFabricacao: Yup.number()
        .typeError('Digite somente números')
        .required('Campo obrigatório')
        .min(1886, 'Digite o ano corretamente'),
      kmAtual: Yup.number().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      await submit(values);
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <>
      <ClientFormWrapper>
        <Input
          label="Placa"
          variant="outlined"
          color="secondary"
          fullWidth
          placeholder='Não utilize "-"'
          id="placa"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Marca/Modelo"
          variant="outlined"
          color="secondary"
          fullWidth
          id="marcaModelo"
          formik={formik}
          disabled={type === 'View'}
        />
        <LogradouroWrapper
          sx={{
            display: { md: 'grid', xs: 'block' },
            gridTemplateColumns: '1fr 1fr !important',
          }}
        >
          <Input
            label="Ano de Fabricacao"
            variant="outlined"
            color="secondary"
            fullWidth
            id="anoFabricacao"
            formik={formik}
            disabled={type === 'View'}
            sx={{ gridArea: 'logradouro' }}
          />
          <Input
            label="KM Atual"
            variant="outlined"
            color="secondary"
            fullWidth
            id="kmAtual"
            formik={formik}
            disabled={type === 'View'}
            sx={{ gridArea: 'numero', marginTop: { sm: '10px', md: 0 } }}
          />
        </LogradouroWrapper>
      </ClientFormWrapper>
      <BottonButtons
        onClose={() => {
          handleClose();
          resetSelectVehicle();
        }}
        onConfirm={formik.handleSubmit}
        disabled={type === 'View'}
      />
    </>
  );
};

export default VehicleForm;
