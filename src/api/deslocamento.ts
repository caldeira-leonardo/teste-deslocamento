import axios from 'axios';

const deslocamentoApi = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1',
});

export default deslocamentoApi;
