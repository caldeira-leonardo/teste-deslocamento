import { ConductorProps } from '@/src/components/Condutores/components/condutorsForm';
import deslocamentoApi from './deslocamento';
import { toast } from 'react-toastify';

export const getConductorData = async () => {
  return await deslocamentoApi
    .get(`/Condutor`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postConductorData = async (data: ConductorProps) => {
  await deslocamentoApi
    .post(`/Condutor`, data)
    .then((res) => {
      toast('Condutor criado com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast('Algo deu errado, tente mais tarde', {
        ...{ toastrProps },
        type: 'error',
      });
      console.log(err);
    });
};

export const patchConductorData = async (data: ConductorProps) => {
  const { numeroHabilitacao, nome, ...newData } = data;

  await deslocamentoApi
    .put(`/Condutor/${data.id}`, { ...newData })
    .then((res) => {
      toast('Condutor alterado com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast('Algo deu errado, tente mais tarde', {
        ...{ toastrProps },
        type: 'error',
      });
      console.log(err);
    });
};

export const deleteConductorData = async (clientId: string | number) => {
  await deslocamentoApi
    .delete(`/Condutor/${clientId}`, { data: { id: clientId } })
    .then((res) => {
      toast('Condutor excluido com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast('Algo deu errado, tente mais tarde', {
        ...{ toastrProps },
        type: 'error',
      });
      console.log(err);
    });
};

const toastrProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};
