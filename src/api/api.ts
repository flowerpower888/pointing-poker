import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pointingpokerbackend.herokuapp.com/',
  timeout: 7000,
});

export default instance;
