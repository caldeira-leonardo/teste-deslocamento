import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import moment from 'moment';
import { ConductorFormWrapper } from '../../Condutors/components/styleCondutors';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ChecklistWrapper } from './styleDeslocamento';

interface DeslocamentoFormProps {
  selectedConductor?: ConductorProps;
  submit(values: ConductorProps): void;
  handleClose(): void;
  type: string;
  resetSelectedConductor(): void;
  conductorOptions: {
    key: number | string;
    label: string;
  }[];
  vehicleOptions: {
    key: number | string;
    label: string;
  }[];
  clientOptions: {
    key: number | string;
    label: string;
  }[];
  checklistOptions: {
    checked: boolean;
    label: string;
    key: number;
  }[];
  handleChecklist(value: string, key: number): void;
}

export interface ConductorProps {
  //remove
  id?: number | string;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  categoriaHabilitacao?: string;
  vencimentoHabilitacao?: string | number;
}

interface DeslocamentoProps {
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: {
    key: number | string;
    label: string;
  };
  idVeiculo: {
    key: number | string;
    label: string;
  };
  idCliente: {
    key: number | string;
    label: string;
  };
}

const DeslocamentoForm = (props: DeslocamentoFormProps) => {
  const {
    submit,
    handleClose,
    selectedConductor,
    type,
    resetSelectedConductor,
    clientOptions,
    conductorOptions,
    vehicleOptions,
    checklistOptions,
    handleChecklist,
  } = props;

  const formik = useFormik<DeslocamentoProps>({
    initialValues: {
      idCliente: {
        key: '',
        label: '',
      },
      idCondutor: {
        key: '',
        label: '',
      },
      idVeiculo: {
        key: '',
        label: '',
      },
      kmInicial: 0,
      inicioDeslocamento: moment().format('YYYY-MM-DD'),
      checkList: '',
      motivo: '',
      observacao: '',
      // nome: selectedConductor?.nome || '',
      // numeroHabilitacao: selectedConductor?.numeroHabilitacao || '',
      // catergoriaHabilitacao: selectedConductor?.catergoriaHabilitacao || '',
      // vencimentoHabilitacao: moment(
      //   selectedConductor?.vencimentoHabilitacao || '',
      // ).format('YYYY-MM-DD'),
      // id: selectedConductor?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo obligatorio'),
      numeroHabilitacao: Yup.string()
        .matches(/^\d+$/, 'Digite somente números')
        .required('Campo obligatorio'),
      catergoriaHabilitacao: Yup.string().required('Campo obligatorio'),
      vencimentoHabilitacao: Yup.string().test({
        test: (value) => {
          return (
            moment(value).isSame(
              moment(selectedConductor?.vencimentoHabilitacao).format(
                'YYYY-MM-DD',
              ),
            ) ||
            moment(value).isAfter(
              moment(selectedConductor?.vencimentoHabilitacao).format(
                'YYYY-MM-DD',
              ),
            )
          );
        },
        message: 'O vencimento não pode ser anterior ao vencimento atual',
      }),
    }),
    onSubmit: async (values: DeslocamentoProps) => {
      // const { vencimentoHabilitacao, ...newValues } = values;
      // await submit({
      //   ...newValues,
      //   vencimentoHabilitacao: moment(vencimentoHabilitacao).format(
      //     'YYYY-MM-DD[T]HH:mm:ss[.000Z]',
      //   ),
      // });
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <>
      <ConductorFormWrapper>
        <Input
          label="Cliente"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idCliente"
          formik={formik}
          type="select"
          options={clientOptions}
          disabled={['View', 'Edit'].includes(type)}
        />
        <Input
          label="Condutor"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idCondutor"
          formik={formik}
          type="select"
          options={conductorOptions}
          disabled={['View', 'Edit'].includes(type)}
        />
        <Input
          label="Veiculo"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idVeiculo"
          formik={formik}
          type="select"
          options={vehicleOptions}
          disabled={type === 'View'}
          sx={{ marginBottom: { xs: '10px', md: '0' } }}
        />
        <Input
          label="início do deslocamento"
          variant="outlined"
          color="secondary"
          fullWidth
          type="fullDate"
          id="inicioDeslocamento"
          formik={formik}
          disabled={type === 'View'}
        />

        <Input
          label="Motivo do deslocamento"
          variant="outlined"
          color="secondary"
          fullWidth
          id="motivo"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Observações"
          variant="outlined"
          color="secondary"
          fullWidth
          id="observacao"
          multiline
          formik={formik}
          maxRows={4}
          minRows={2}
          disabled={type === 'View'}
        />
        <h5 style={{ margin: 0, marginBottom: 0 }}>Checklist</h5>
        <ChecklistWrapper>
          {checklistOptions.map((option) => {
            return (
              <FormControlLabel
                key={option.key}
                control={
                  <Checkbox
                    color="secondary"
                    checked={option.checked}
                    onClick={() => handleChecklist(option.label, option.key)}
                    key={option.key}
                  />
                }
                label={option.label}
              />
            );
          })}
        </ChecklistWrapper>
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

export default DeslocamentoForm;
