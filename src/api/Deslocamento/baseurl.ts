import axios from 'axios';

const baseurl = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1',
});

export default baseurl;
