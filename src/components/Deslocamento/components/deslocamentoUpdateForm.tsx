import React, { useEffect, useState } from 'react';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import { ConductorFormWrapper } from '../../Condutors/components/styleCondutors';
import { DeslocamentoProps } from './deslocamentoComponent';
import * as Yup from 'yup';
import dayjs from 'dayjs';

interface DeslocamentoUpdateFormProps {
  submit(values: DeslocamentoUpdateProps): void;
  handleClose(): void;
  deslocOptions: { key: string | number; label: string; }[];
  kmInicial?: number;
  inicioDeslocamento?: string;
  allDeslocamentos: DeslocamentoProps[];
}

export interface DeslocamentoUpdateProps {
  selectedDesloc?: { key: string | number; label: string; };
  id?: number;
  kmFinal?: number;
  fimDeslocamento?: string;
  observacao?: string;
}

const DeslocamentoUpdateForm = (props: DeslocamentoUpdateFormProps) => {
  const { submit, handleClose, deslocOptions, allDeslocamentos } = props;
  const [
    selectedDeslocamento,
    setSelectedDeslocamento,
  ] = useState<DeslocamentoProps>();
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik<DeslocamentoUpdateProps>({
    initialValues: {
      id: undefined,
      kmFinal: undefined,
      fimDeslocamento: '',
      observacao: '',
    },
    validationSchema: Yup.object().shape({
      fimDeslocamento: Yup.string().test({
        test: (value) => {
          return dayjs(value).isAfter(
            dayjs(selectedDeslocamento?.inicioDeslocamento),
          );
        },
        message: 'a data final não pode ser anterior a data inicial',
      }),
      kmFinal: Yup.string().test({
        test: (value) => {
          return Number(value) > selectedDeslocamento?.kmInicial;
        },
        message: 'O km inicial não pode ser anterior ao km final',
      }),
    }),
    enableReinitialize: true,
    onSubmit: async (values: DeslocamentoUpdateProps) => {
      await submit(values);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    if (formik.values.selectedDesloc?.key) {
      setShowForm(true);
      const selectDeslocamento = allDeslocamentos.filter(
        (item) => item.id === formik.values.selectedDesloc?.key,
      )[0];
      setSelectedDeslocamento(selectDeslocamento);

      formik.setFieldValue('id', formik.values.selectedDesloc?.key);
    }
  }, [formik.values.selectedDesloc]);

  return (
    <>
      <ConductorFormWrapper>
        <Input
          type="select"
          options={deslocOptions}
          formik={formik}
          label="Cliente"
          variant="outlined"
          color="secondary"
          fullWidth
          id="selectedDesloc"
        />

        {showForm && (
          <>
            <Input
              label="Fim do deslocamento"
              variant="outlined"
              color="secondary"
              fullWidth
              type="fullDate"
              id="fimDeslocamento"
              formik={formik}
            />
            <Input
              label="Km final"
              variant="outlined"
              color="secondary"
              fullWidth
              id="kmFinal"
              formik={formik}
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
            />
          </>
        )}
      </ConductorFormWrapper>
      <BottonButtons
        onClose={() => {
          handleClose();
        }}
        onConfirm={formik.handleSubmit}
        disabled={false}
      />
    </>
  );
};

export default DeslocamentoUpdateForm;
