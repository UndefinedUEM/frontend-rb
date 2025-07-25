import { describe, it, expect } from 'vitest';
import { errorHandler } from './errorHandler';

describe('errorHandler', () => {
  it('deve retornar a mensagem de 401 para status não autorizado', () => {
    const mockError = { response: { status: 401 } };
    const result = errorHandler(mockError);
    expect(result).toBe('Credenciais inválidas ou token expirado.');
  });

  it('deve retornar a mensagem de 403 para status proibido', () => {
    const mockError = { response: { status: 403 } };
    const result = errorHandler(mockError);
    expect(result).toBe('Você não tem permissão para executar esta ação.');
  });

  it('deve retornar a mensagem de 404 para status não encontrado', () => {
    const mockError = { response: { status: 404 } };
    const result = errorHandler(mockError);
    expect(result).toBe('O recurso solicitado não foi encontrado.');
  });

  it('deve retornar a mensagem da API para outros erros com resposta', () => {
    const mockError = {
      response: {
        status: 409,
        data: { message: 'Este e-mail já está em uso.' },
      },
    };
    const result = errorHandler(mockError);
    expect(result).toBe('Este e-mail já está em uso.');
  });

  it('deve retornar uma mensagem genérica se a API não fornecer uma', () => {
    const mockError = { response: { status: 500, data: {} } };
    const result = errorHandler(mockError);
    expect(result).toBe('Ocorreu um erro inesperado.');
  });

  it('deve retornar uma mensagem de erro de rede se não houver objeto de resposta', () => {
    const mockError = new Error('Network Error');
    const result = errorHandler(mockError);
    expect(result).toBe('Não foi possível conectar ao servidor. Verifique sua rede.');
  });
});