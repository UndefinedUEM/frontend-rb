import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const mockPost = vi.fn();
const mockGet = vi.fn();

describe('scoutApi', () => {
  let scoutApi;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    localStorage.clear();

    vi.mocked(axios.create).mockReturnValue({
      post: mockPost,
      get: mockGet,
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    });

    const module = await import('./scoutApi');
    scoutApi = module.default;
  });

  describe('registerUser', () => {
    it('deve retornar os dados do usuário em caso de sucesso (200)', async () => {
      const userData = { name: 'Chefe Meg', email: 'megg@email.com', password: '123' };
      const mockResponse = { data: { id: 2, name: 'Chefe Meg', email: 'megg@email.com' } };
      mockPost.mockResolvedValue(mockResponse);

      const result = await scoutApi.registerUser(userData);

      expect(mockPost).toHaveBeenCalledWith('/auth/cadastro', userData);
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lançar um erro quando o e-mail já existe (409)', async () => {
      const mockError = {
        response: {
          status: 409,
          data: { message: 'Este e-mail já está em uso.' },
        },
      };
      mockPost.mockRejectedValue(mockError);

      await expect(scoutApi.registerUser({})).rejects.toThrow('Este e-mail já está em uso.');
    });
  });

  describe('login', () => {
    it('deve retornar o access_token e salvá-lo no storage em caso de sucesso (200)', async () => {
      const mockResponse = { data: { access_token: 'fake-jwt-token' } };
      mockPost.mockResolvedValue(mockResponse);

      const result = await scoutApi.login('teste@teste.com', '123');

      expect(mockPost).toHaveBeenCalledWith('/auth/login', { email: 'teste@teste.com', password: '123' });
      expect(localStorage.getItem('authToken')).toBe('fake-jwt-token');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lançar um erro para credenciais inválidas (401)', async () => {
      const mockError = { response: { status: 401 } };
      mockPost.mockRejectedValue(mockError);

      await expect(scoutApi.login('a', 'b')).rejects.toThrow('Credenciais inválidas ou token expirado.');
    });
  });

  describe('getScouts', () => {
    it('deve retornar a lista de escoteiros (200)', async () => {
      const mockResponse = { data: [{ id: 34, name: 'Adrian Fahrenheit Tepes' }] };
      mockGet.mockResolvedValue(mockResponse);

      const result = await scoutApi.getScouts();

      expect(mockGet).toHaveBeenCalledWith('/escoteiros');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('registerScout', () => {
    it('deve retornar o novo escoteiro cadastrado (200)', async () => {
      const scoutData = { id: '42', name: 'Tyrion Lannister' };
      const mockResponse = { data: { id: 42, name: 'Tyrion Lannister' } };
      mockPost.mockResolvedValue(mockResponse);

      const result = await scoutApi.registerScout(scoutData);

      expect(mockPost).toHaveBeenCalledWith('/escoteiros/cadastro', scoutData);
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lançar um erro quando o ID do escoteiro já existe (409)', async () => {
      const mockError = {
        response: {
          status: 409,
          data: { message: 'Já existe um escoteiro com este ID.' },
        },
      };
      mockPost.mockRejectedValue(mockError);

      await expect(scoutApi.registerScout({})).rejects.toThrow('Já existe um escoteiro com este ID.');
    });
  });

  describe('confirmList', () => {
    it('deve retornar a lista confirmada (200)', async () => {
      const listData = [10, 13, 15];
      const mockResponse = { data: { id: 2, confirmedScouts: [] } };
      mockPost.mockResolvedValue(mockResponse);

      const result = await scoutApi.confirmList(listData);

      expect(mockPost).toHaveBeenCalledWith('/listas/confirmar', listData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getLists', () => {
    it('deve retornar um array de listas (200)', async () => {
      const mockResponse = { data: [{ id: 1 }, { id: 2 }] };
      mockGet.mockResolvedValue(mockResponse);

      const result = await scoutApi.getLists();

      expect(mockGet).toHaveBeenCalledWith('/listas');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve retornar uma única lista quando um ID é fornecido (200)', async () => {
      const mockResponse = { data: { id: 1 } };
      mockGet.mockResolvedValue(mockResponse);

      const result = await scoutApi.getLists(1);

      expect(mockGet).toHaveBeenCalledWith('/listas/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lançar um erro quando a lista não é encontrada (404)', async () => {
      const mockError = { response: { status: 404 } };
      mockGet.mockRejectedValue(mockError);

      await expect(scoutApi.getLists(999)).rejects.toThrow('O recurso solicitado não foi encontrado.');
    });
  });
});