import axios from 'axios';
import { AxiosHttpAdapter } from './AxiosHttpAdapter';
import { HttpService } from './HttpService';

const globalErrorHandler = (response) => {
  switch (response.status) {
    case 401:
      return 'INVALID_CREDENTIALS';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    default:
      return 'UNKNOWN';
  }
};

/**
 * @typedef {object} UserData
 * @property {string} name - O nome completo do usuário.
 * @property {string} email - O endereço de e-mail do usuário.
 * @property {string} password - A senha do usuário (mínimo de 6 caracteres).
 */

class ScoutApiService extends HttpService {
  constructor(apiAdapter) {
    super(apiAdapter, globalErrorHandler);
  }

  login(email, password) {
    return this._post('/auth/login', { email, password });
  }

  /**
   * Registra um novo usuário no sistema.
   * @param {UserData} userData - Os dados do usuário para o cadastro.
   * @returns {Promise<any>} A resposta da API com os dados do usuário criado.
   */
  registerUser(userData) {
    return this._post('/auth/cadastro', userData);
  }

  registerScout(name, id) {
    return this._post('/escoteiros/cadastro', { name, id });
  }

  /**
   * Confirma uma lista de presença enviando os IDs dos presentes.
   * @param {number[]} listData - Um array contendo os IDs numéricos dos escoteiros presentes.
   * @returns {Promise<any>} A resposta da API após a confirmação.
   */
  confirmList(listData) {
    return this._post('/listas/confirmar', listData);
  }

  getScouts() {
    return this._get('/escoteiros');
  }

  getLists(id) {
    const url = id ? `/listas/${id}` : '/listas';
    return this._get(url);
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const scoutApi = new ScoutApiService(new AxiosHttpAdapter(axiosInstance));

export default scoutApi;
