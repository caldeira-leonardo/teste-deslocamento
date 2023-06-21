import { ClientProps } from '@/src/components/Client/components/clientForm';
import deslocamentoApi from './deslocamento';
import { toast } from 'react-toastify';

export const getClientsData = async () => {
  return await deslocamentoApi
    .get(`/Cliente`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postClientsData = async (data: ClientProps) => {
  await deslocamentoApi
    .post(`/Cliente`, data)
    .then((res) => {
      toast('Usuário criado com sucesso', {
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

export const patchClientsData = async (data: ClientProps) => {
  const { numeroDocumento, tipoDocumento, ...newData } = data;

  await deslocamentoApi
    .put(`/Cliente/${data.id}`, { ...newData })
    .then((res) => {
      toast('Usuário alterado com sucesso', {
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

export const deleteClientsData = async (clientId: string | number) => {
  await deslocamentoApi
    .delete(`/Cliente/${clientId}`, { data: { id: clientId } })
    .then((res) => {
      toast('Usuário excluido com sucesso', {
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
