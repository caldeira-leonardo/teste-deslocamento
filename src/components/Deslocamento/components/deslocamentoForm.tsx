import React, { useEffect, useState } from 'react';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import { ConductorFormWrapper } from '../../Condutors/components/styleCondutors';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ChecklistWrapper } from './styleDeslocamento';
import * as Yup from 'yup';

interface DeslocamentoFormProps {
  selectedDeslocamento?: DeslocamentoProps;
  submit(values: DeslocamentoProps): void;
  handleClose(): void;
  type: string;
  resetSelectedDeslocamento(): void;
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
  handleChecklist(value: string, newChacked?: boolean): void;
}

interface DeslocamentoProps {
  id?: number;
  kmInicial?: number;
  kmFinal?: number;
  inicioDeslocamento?: string;
  fimDeslocamento?: string;
  checkList?: string;
  motivo?: string;
  observacao?: string;
  idCondutor:
  | string
  | number
  | {
    key: number | string;
    label: string;
  };
  idVeiculo:
  | string
  | number
  | {
    key: number | string;
    label: string;
  };
  idCliente:
  | string
  | number
  | {
    key: number | string;
    label: string;
  };
}

const DeslocamentoForm = (props: DeslocamentoFormProps) => {
  const {
    submit,
    handleClose,
    selectedDeslocamento,
    type,
    resetSelectedDeslocamento,
    clientOptions,
    conductorOptions,
    vehicleOptions,
    checklistOptions,
    handleChecklist,
  } = props;

  const selectedClient = clientOptions.filter(
    (client) => client.key === selectedDeslocamento?.idCliente,
  )[0];

  const selectedConductor = conductorOptions.filter(
    (conductor) => conductor.key === selectedDeslocamento?.idCondutor,
  )[0];

  const selectedVehicle = vehicleOptions.filter(
    (vehicle) => vehicle.key === selectedDeslocamento?.idVeiculo,
  )[0];

  const formik = useFormik<DeslocamentoProps>({
    initialValues: {
      idCliente: {
        key: selectedClient?.key || '',
        label: selectedClient?.label || '',
      },
      idCondutor: {
        key: selectedConductor?.key || '',
        label: selectedConductor?.label || '',
      },
      idVeiculo: {
        key: selectedVehicle?.key || '',
        label: selectedVehicle?.label || '',
      },
      kmInicial: selectedDeslocamento?.kmInicial || 0,
      kmFinal: selectedDeslocamento?.kmFinal || undefined,
      inicioDeslocamento: selectedDeslocamento?.inicioDeslocamento || '',
      fimDeslocamento: selectedDeslocamento?.fimDeslocamento || '',
      checkList: selectedDeslocamento?.checkList || '',
      motivo: selectedDeslocamento?.motivo || '',
      observacao: selectedDeslocamento?.observacao || '',
    },
    enableReinitialize: true,
    onSubmit: async (values: DeslocamentoProps) => {
      const {
        idCliente,
        idCondutor,
        idVeiculo,
        fimDeslocamento,
        kmFinal,
      } = values;
      const newData = {
        ...values,
        idCliente: idCliente?.key,
        idCondutor: idCondutor?.key,
        idVeiculo: idVeiculo?.key,
      };
      delete newData.fimDeslocamento;
      delete newData.kmFinal;
      if (type !== 'Create') {
        newData.fimDeslocamento = fimDeslocamento;
        newData.kmFinal = kmFinal;
      }
      await submit(newData);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    const checkList = checklistOptions
      .filter((checklist: any) => checklist.checked)
      .map((checklist: any) => checklist.label)
      .toString();

    formik.setFieldValue('checkList', checkList);
  }, [checklistOptions]);

  useEffect(() => {
    const checkedItems = selectedDeslocamento?.checkList
      .split(',')
      .filter((item) => item);

    checkedItems?.forEach((item) => {
      handleChecklist(item, true);
    });
  }, [selectedDeslocamento?.checkList]);

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
          readOnly={['View'].includes(type)}
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
          readOnly={['View'].includes(type)}
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
          readOnly={type === 'View'}
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
          readOnly={type === 'View'}
        />
        <Input
          label="Fim do deslocamento"
          variant="outlined"
          color="secondary"
          fullWidth
          type="fullDate"
          id="fimDeslocamento"
          formik={formik}
          readOnly={type === 'View'}
          disabled={type === 'Create' || !selectedDeslocamento?.fimDeslocamento}
        />
        <Input
          label="Km inicial"
          variant="outlined"
          color="secondary"
          fullWidth
          id="kmInicial"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Km final"
          variant="outlined"
          color="secondary"
          fullWidth
          id="kmFinal"
          formik={formik}
          disabled={
            !selectedDeslocamento?.fimDeslocamento ||
            type === 'View' ||
            type === 'Create'
          }
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
                    onClick={() =>
                      type !== 'View' ? handleChecklist(option.label) : {}
                    }
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
          resetSelectedDeslocamento();
        }}
        onConfirm={formik.handleSubmit}
        disabled={type === 'View'}
      />
    </>
  );
};

export default DeslocamentoForm;
