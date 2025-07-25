export const errorHandler = (error) => {
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