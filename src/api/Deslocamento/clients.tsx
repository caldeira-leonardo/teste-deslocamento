import { ClientProps } from '@/src/components/Client/components/clientForm';
import deslocamentoApi from './deslocamento';

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
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteClientsData = async (clientId: string | number) => {
  await deslocamentoApi
    .delete(`/Cliente/${clientId}`, { data: { id: clientId } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
