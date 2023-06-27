import baseurl from './baseurl';
import { toast } from 'react-toastify';
import { DeslocamentoProps } from '@/src/components/Deslocamento/components/deslocamentoComponent';

export const getDeslocamentoData = async () => {
  return await baseurl
    .get(`/Deslocamento`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postDeslocamentoData = async (data: DeslocamentoProps) => {
  await baseurl
    .post(`/Deslocamento/IniciarDeslocamento`, data)
    .then((res) => {
      toast('Deslocamento criado com sucesso', {
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

export const patchDeslocamentoData = async (data: DeslocamentoProps) => {
  const { ...newData } = data;

  await baseurl
    .put(`/Deslocamento/${data.id}`, { ...newData })
    .then((res) => {
      toast('Deslocamento alterado com sucesso', {
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

export const deleteDeslocamentoData = async (
  deslocamentoId: string | number,
) => {
  await baseurl
    .delete(`/Deslocamento/${deslocamentoId}`, { data: { id: deslocamentoId } })
    .then((res) => {
      toast('Deslocamento excluido com sucesso', {
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
