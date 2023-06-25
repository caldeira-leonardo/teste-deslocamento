import { ConductorProps } from '@/src/components/Condutors/components/condutorsForm';
import { toast } from 'react-toastify';
import baseurl from './baseurl';

export const getConductorData = async () => {
  return await baseurl
    .get(`/Condutor`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postConductorData = async (data: ConductorProps) => {
  const { id, catergoriaHabilitacao, ...newData } = data;
  newData.categoriaHabilitacao = catergoriaHabilitacao;

  await baseurl
    .post(`/Condutor`, newData)
    .then((res) => {
      toast('Condutor criado com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast(`${err.response.data}`, {
        ...{ toastrProps },
        type: 'error',
      });
      console.log(err);
    });
};

export const patchConductorData = async (data: ConductorProps) => {
  const { numeroHabilitacao, catergoriaHabilitacao, nome, ...newData } = data;
  newData.categoriaHabilitacao = catergoriaHabilitacao;

  await baseurl
    .put(`/Condutor/${data.id}`, newData)
    .then((res) => {
      toast('Condutor alterado com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast(`${err.response.data}`, {
        ...{ toastrProps },
        type: 'error',
      });
      console.log(err);
    });
};

export const deleteConductorData = async (conductorId: string | number) => {
  await baseurl
    .delete(`/Condutor/${conductorId}`, { data: { id: conductorId } })
    .then((res) => {
      toast('Condutor excluido com sucesso', {
        ...{ toastrProps },
        type: 'success',
      });
      return res.data;
    })
    .catch((err) => {
      toast(`${err.response.data}`, {
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
