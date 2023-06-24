import { VehiclesProps } from '@/src/components/Vehicles/components/vehiclesForm';
import deslocamentoApi from './deslocamento';
import { toast } from 'react-toastify';

export const getVehiclesData = async () => {
  return await deslocamentoApi
    .get(`/Veiculo`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postVehiclesData = async (data: VehiclesProps) => {
  await deslocamentoApi
    .post(`/Veiculo`, data)
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

export const patchVehiclesData = async (data: VehiclesProps) => {
  const { ...newData } = data;

  await deslocamentoApi
    .put(`/Veiculo/${data.id}`, { ...newData })
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

export const deleteVehiclesData = async (clientId: string | number) => {
  await deslocamentoApi
    .delete(`/Veiculo/${clientId}`, { data: { id: clientId } })
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
