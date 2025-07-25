import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const errorHandler = (error) => {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        return 'Credenciais inválidas ou token expirado.';
      case 403:
        return 'Você não tem permissão para executar esta ação.';
      case 404:
        return 'O recurso solicitado não foi encontrado.';
      default:
        return error.response.data?.message || 'Ocorreu um erro inesperado.';
    }
  }
  return 'Não foi possível conectar ao servidor. Verifique sua rede.';
};

/**
 * @typedef {object} UserData
 * @property {string} name - O nome completo do usuário.
 * @property {string} email - O endereço de e-mail do usuário.
 * @property {string} password - A senha do usuário.
 */

/**
 * @typedef {object} ScoutData
 * @property {string} name - O nome completo do escoteiro.
 * @property {string} id - O ID de registro do escoteiro.
 */

const scoutApi = {
  /**
   * Autentica um usuário e armazena o token.
   * @param {string} email - O e-mail do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<{user: object, token: string}>}
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('authToken', token);
      }
      return { user, token };
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },

  /**
   * Registra um novo usuário no sistema.
   * @param {UserData} userData - Os dados do usuário para o cadastro.
   * @returns {Promise<any>} A resposta da API com os dados do usuário criado.
   */
  registerUser: async (userData) => {
    try {
      const response = await api.post('/auth/cadastro', userData);
      return response.data;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },

  /**
   * Registra um novo escoteiro no sistema.
   * @param {ScoutData} scoutData - Os dados do escoteiro para o cadastro.
   * @returns {Promise<any>} A resposta da API.
   */
  registerScout: async (scoutData) => {
    try {
      const response = await api.post('/escoteiros/cadastro', scoutData);
      return response.data;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },

  /**
   * Busca a lista de todos os escoteiros.
   * @returns {Promise<any>} A lista de escoteiros.
   */
  getScouts: async () => {
    try {
      const response = await api.get('/escoteiros');
      return response.data;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },

  /**
   * Busca todas as listas de presença ou uma lista específica pelo ID.
   * @param {number} [id] - O ID opcional da lista a ser buscada.
   * @returns {Promise<any>} A(s) lista(s) de presença.
   */
  getLists: async (id) => {
    try {
      const url = id ? `/listas/${id}` : '/listas';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },

  /**
   * Confirma uma lista de presença enviando os IDs dos presentes.
   * @param {number[]} listData - Um array contendo os IDs numéricos dos escoteiros presentes.
   * @returns {Promise<any>} A resposta da API após a confirmação.
   */
  confirmList: async (listData) => {
    try {
      const response = await api.post('/listas/confirmar', listData);
      return response.data;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },
};

export default scoutApi;
