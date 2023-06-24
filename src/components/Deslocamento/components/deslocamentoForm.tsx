import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Input from '@/src/components/elements/Input/input';
import { useFormik } from 'formik';
import BottonButtons from '../../elements/Modal/bottomButtons';
import moment from 'moment';
import { ConductorFormWrapper } from '../../Condutors/components/styleCondutors';

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
      inicioDeslocamento: '',
      kmInicial: 0,
      motivo: '',
      observacao: '',
      checkList: '',
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
          label="Nome"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idCliente"
          formik={formik}
          disabled={['View', 'Edit'].includes(type)}
        />
        <Input
          label="Numero da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idCondutor"
          formik={formik}
          disabled={['View', 'Edit'].includes(type)}
        />
        <Input
          label="Categoria da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          id="idVeiculo"
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
          id="kmInicial"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Vencimento da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          type="date"
          id="motivo"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Vencimento da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          type="date"
          id="observacao"
          formik={formik}
          disabled={type === 'View'}
        />
        <Input
          label="Vencimento da habilitação"
          variant="outlined"
          color="secondary"
          fullWidth
          type="date"
          id="checkList"
          formik={formik}
          disabled={type === 'View'}
        />
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
