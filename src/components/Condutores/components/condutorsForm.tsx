import React, { useMemo, useState, useEffect } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import { LogradouroWrapper, ConductorFormWrapper } from './styleCondutores';

interface ConductorFormProps {
  selectedConductor?: ConductorProps;
  submit(values: ConductorProps): void;
  handleClose(): void;
  type: string;
  resetSelectedConductor(): void;
}

export interface ConductorProps {
  id?: number | string;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao?: string;
}

const ConductorForm = (props: ConductorFormProps) => {
  const {
    submit,
    handleClose,
    selectedConductor,
    type,
    resetSelectedConductor,
  } = props;

  const formik = useFormik<ConductorProps>({
    initialValues: {
      nome: selectedConductor?.nome || '',
      numeroHabilitacao: selectedConductor?.numeroHabilitacao || '',
      catergoriaHabilitacao: selectedConductor?.catergoriaHabilitacao || '',
      vencimentoHabilitacao: selectedConductor?.vencimentoHabilitacao || '',
      id: selectedConductor?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo obligatorio'),
      numeroHabilitacao: Yup.string()
        .matches(/^\d+$/, 'Digite somente números')
        .required('Campo obligatorio'),
      catergoriaHabilitacao: Yup.string().required('Campo obligatorio'),
      vencimentoHabilitacao: Yup.string(),
    }),
    onSubmit: async (values) => {
      await submit(values);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    console.log('formik', formik); //TODO remove log
  }, [formik]);

  return (
    <>
      <ConductorFormWrapper>
        <Input
          label="Nome"
          variant="outlined"
          color="secondary"
          fullWidth
          id="nome"
          formik={formik}
          disabled={['View', 'Edit'].includes(type)}
        />
        <Input
          label="Numero da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          id="numeroHabilitacao"
          formik={formik}
          disabled={['View', 'Edit'].includes(type)}
        />
        <LogradouroWrapper
          sx={{
            display: { xs: 'block', md: 'grid' },
            gridTemplateColumns: '1fr 1fr !important',
          }}
        >
          <Input
            label="Categoria da habilitação"
            variant="outlined"
            color="secondary"
            fullWidth
            id="catergoriaHabilitacao"
            formik={formik}
            disabled={type === 'View'}
            sx={{ marginBottom: { xs: '10px', md: '0' } }}
          />
          <Input
            label="Vencimento da habilitação"
            variant="outlined"
            color="secondary"
            fullWidth
            type="date"
            id="vencimentoHabilitacao"
            formik={formik}
            disabled={type === 'View'}
          />
        </LogradouroWrapper>
      </ConductorFormWrapper>
      <BottonButtons
        onClose={() => {
          handleClose();
          resetSelectedConductor();
        }}
        onConfirm={formik.handleSubmit}
        disabled={type === 'View'}
      />
    </>
  );
};

export default ConductorForm;
