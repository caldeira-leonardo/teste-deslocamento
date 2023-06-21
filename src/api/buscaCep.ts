import axios from 'axios';

const buscaCepApi = axios.create({ baseURL: 'https://viacep.com.br/ws/' });

export default buscaCepApi;
