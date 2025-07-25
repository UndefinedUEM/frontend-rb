export const isResponseError = (response) => {
  return response && typeof response === 'object' && 'error' in response;
};